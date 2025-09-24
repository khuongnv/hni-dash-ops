export default defineEventHandler(async (event) => {
  try {
    // Check if running on Vercel (production)
    if (process.env.VERCEL) {
      return await getGitHubData()
    }
    
    // Development: Use local git commands
    return await getLocalGitData()
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Git log error: ${error.message}`
    })
  }
})

async function getLocalGitData() {
  const { execSync } = await import('child_process')
  
  // Get git log with detailed information
  const gitLog = execSync('git log --oneline --graph --decorate --all -20', { 
    encoding: 'utf8',
    cwd: process.cwd()
  })
  
  // Get git log with more details for each commit (including full message)
  const detailedLog = execSync('git log --pretty=format:"%h|%an|%ae|%ad|%s|%b" --date=iso -20', { 
    encoding: 'utf8',
    cwd: process.cwd()
  })
  
  // Parse detailed log
  const commits = detailedLog.split('\n').map(line => {
    const parts = line.split('|')
    if (parts.length >= 5) {
      const [hash, author, email, date, subject, body] = parts
      const fullMessage = body ? `${subject}\n\n${body}`.trim() : subject
      return {
        hash: hash?.trim(),
        author: author?.trim(),
        email: email?.trim(),
        date: date?.trim(),
        message: fullMessage
      }
    }
    return null
  }).filter(commit => commit && commit.hash)
  
  // Get current branch
  const currentBranch = execSync('git branch --show-current', { 
    encoding: 'utf8',
    cwd: process.cwd()
  }).trim()
  
  // Get remote branches
  const remoteBranches = execSync('git branch -r', { 
    encoding: 'utf8',
    cwd: process.cwd()
  }).split('\n').map(branch => branch.trim()).filter(branch => branch)
  
  // Get last push info
  let lastPush = null
  try {
    const lastPushInfo = execSync('git log origin/main..HEAD --oneline', { 
      encoding: 'utf8',
      cwd: process.cwd()
    })
    if (lastPushInfo.trim()) {
      lastPush = {
        unpushed: lastPushInfo.split('\n').filter(line => line.trim()).length,
        commits: lastPushInfo.split('\n').filter(line => line.trim())
      }
    }
  } catch (error) {
    // No unpushed commits
  }
  
  return {
    success: true,
    data: {
      currentBranch,
      remoteBranches,
      commits,
      lastPush,
      rawLog: gitLog,
      source: 'local'
    }
  }
}

async function getGitHubData() {
  try {
    // GitHub repository info (you can make this configurable)
    const owner = 'khuongnv'
    const repo = 'nuxt-hni-dash-ops'
    
    // Get commits from GitHub API
    const commitsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=20`)
    const commitsData = await commitsResponse.json()
    
    // Get repository info
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    const repoData = await repoResponse.json()
    
    // Get branches
    const branchesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`)
    const branchesData = await branchesResponse.json()
    
    // Transform commits data
    const commits = commitsData.map((commit: any) => ({
      hash: commit.sha.substring(0, 7),
      author: commit.commit.author.name,
      email: commit.commit.author.email,
      date: commit.commit.author.date,
      message: commit.commit.message // Full message including body
    }))
    
    // Transform branches data
    const remoteBranches = branchesData.map((branch: any) => `origin/${branch.name}`)
    
    // Create raw log format
    const rawLog = commits.map(commit => 
      `* ${commit.hash} ${commit.message} (${commit.author})`
    ).join('\n')
    
    return {
      success: true,
      data: {
        currentBranch: repoData.default_branch || 'main',
        remoteBranches,
        commits,
        lastPush: null, // GitHub API doesn't provide this info easily
        rawLog,
        source: 'github'
      }
    }
  } catch (error: any) {
    // Fallback data if GitHub API fails
    return {
      success: true,
      data: {
        currentBranch: 'main',
        remoteBranches: ['origin/main'],
        commits: [{
          hash: 'unknown',
          author: 'System',
          email: 'system@example.com',
          date: new Date().toISOString(),
          message: 'Git log không khả dụng trên production'
        }],
        lastPush: null,
        rawLog: 'Git log không khả dụng trên production environment',
        source: 'fallback'
      }
    }
  }
}
