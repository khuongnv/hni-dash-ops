<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader 
      title="Báo cáo & Thống kê"
    >
      <template #actions>
        <Button>
          <FileText class="mr-2 h-4 w-4" />
          Tạo báo cáo mới
        </Button>
      </template>
    </PageHeader>

    <!-- Report Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Bộ lọc báo cáo</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-4">
          <div>
            <Label for="date-from">Từ ngày</Label>
            <Input id="date-from" type="date" />
          </div>
          <div>
            <Label for="date-to">Đến ngày</Label>
            <Input id="date-to" type="date" />
          </div>
          <div>
            <Label for="report-type">Loại báo cáo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại báo cáo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user-activity">Hoạt động người dùng</SelectItem>
                <SelectItem value="revenue">Doanh thu</SelectItem>
                <SelectItem value="system-performance">Hiệu suất hệ thống</SelectItem>
                <SelectItem value="security">Bảo mật</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-end">
            <Button class="w-full">
              <Search class="mr-2 h-4 w-4" />
              Tạo báo cáo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Quick Stats -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card v-for="stat in quickStats" :key="stat.title">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">{{ stat.title }}</CardTitle>
          <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground">{{ stat.description }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- Reports Table -->
    <Card>
      <CardHeader>
        <CardTitle>Báo cáo đã tạo</CardTitle>
        <CardDescription>
          Danh sách các báo cáo đã được tạo trong hệ thống
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên báo cáo</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Người tạo</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead class="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="report in reports" :key="report.id">
                <TableCell class="font-medium">
                  <div class="flex items-center space-x-2">
                    <FileText class="h-4 w-4 text-muted-foreground" />
                    <span>{{ report.name }}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge :variant="getReportTypeVariant(report.type)">
                    {{ getReportTypeLabel(report.type) }}
                  </Badge>
                </TableCell>
                <TableCell>{{ report.createdBy }}</TableCell>
                <TableCell>{{ new Date(report.createdAt).toLocaleDateString('vi-VN') }}</TableCell>
                <TableCell>
                  <Badge :variant="getStatusVariant(report.status)">
                    {{ getStatusLabel(report.status) }}
                  </Badge>
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Download class="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye class="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 class="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    <!-- Chart Section -->
    <div class="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ hoạt động người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
            <div class="text-center">
              <BarChart3 class="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p class="text-muted-foreground">Biểu đồ hoạt động</p>
              <p class="text-sm text-muted-foreground">Mock data - Cần tích hợp chart library</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ doanh thu theo tháng</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
            <div class="text-center">
              <TrendingUp class="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p class="text-muted-foreground">Biểu đồ doanh thu</p>
              <p class="text-sm text-muted-foreground">Mock data - Cần tích hợp chart library</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Trash2,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Shield
} from 'lucide-vue-next'

// Import UI components explicitly
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardContent from '~/components/ui/CardContent.vue'
import CardDescription from '~/components/ui/CardDescription.vue'
import Input from '~/components/ui/Input.vue'
import Label from '~/components/ui/Label.vue'
import Select from '~/components/ui/Select.vue'
import SelectTrigger from '~/components/ui/SelectTrigger.vue'
import SelectValue from '~/components/ui/SelectValue.vue'
import SelectContent from '~/components/ui/SelectContent.vue'
import SelectItem from '~/components/ui/SelectItem.vue'
import Table from '~/components/ui/Table.vue'
import TableHeader from '~/components/ui/TableHeader.vue'
import TableBody from '~/components/ui/TableBody.vue'
import TableRow from '~/components/ui/TableRow.vue'
import TableHead from '~/components/ui/TableHead.vue'
import TableCell from '~/components/ui/TableCell.vue'
import Badge from '~/components/ui/Badge.vue'

// Set page meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Set page title
useHead({
  title: 'Báo cáo & Thống kê - HNI Operations'
})

// Quick stats
const quickStats = [
  {
    title: 'Tổng báo cáo',
    value: '24',
    description: 'Trong tháng này',
    icon: FileText
  },
  {
    title: 'Người dùng hoạt động',
    value: '1,234',
    description: 'Trong 7 ngày qua',
    icon: Users
  },
  {
    title: 'Doanh thu',
    value: '12.5M',
    description: 'VND tháng này',
    icon: DollarSign
  },
  {
    title: 'Sự kiện bảo mật',
    value: '3',
    description: 'Cần xem xét',
    icon: Shield
  }
]

// Mock data for reports
const reports = [
  {
    id: 'RPT001',
    name: 'Báo cáo hoạt động tháng 12/2024',
    type: 'user-activity',
    createdBy: 'Admin User',
    createdAt: '2024-12-01',
    status: 'completed'
  },
  {
    id: 'RPT002',
    name: 'Báo cáo doanh thu Q4/2024',
    type: 'revenue',
    createdBy: 'Finance Team',
    createdAt: '2024-11-30',
    status: 'completed'
  },
  {
    id: 'RPT003',
    name: 'Báo cáo hiệu suất hệ thống',
    type: 'system-performance',
    createdBy: 'DevOps Team',
    createdAt: '2024-11-28',
    status: 'processing'
  },
  {
    id: 'RPT004',
    name: 'Báo cáo bảo mật tháng 11',
    type: 'security',
    createdBy: 'Security Team',
    createdAt: '2024-11-25',
    status: 'completed'
  }
]

// Helper functions
const getReportTypeVariant = (type: string) => {
  const variants: Record<string, string> = {
    'user-activity': 'default',
    'revenue': 'secondary',
    'system-performance': 'outline',
    'security': 'destructive'
  }
  return variants[type] || 'default'
}

const getReportTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'user-activity': 'Hoạt động người dùng',
    'revenue': 'Doanh thu',
    'system-performance': 'Hiệu suất hệ thống',
    'security': 'Bảo mật'
  }
  return labels[type] || type
}

const getStatusVariant = (status: string) => {
  const variants: Record<string, string> = {
    completed: 'default',
    processing: 'secondary',
    failed: 'destructive'
  }
  return variants[status] || 'default'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    completed: 'Hoàn thành',
    processing: 'Đang xử lý',
    failed: 'Lỗi'
  }
  return labels[status] || status
}
</script>
