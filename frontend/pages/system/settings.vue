<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader 
      title="Cài đặt hệ thống"
    />

    <!-- Settings Sections -->
    <div class="grid gap-6">
      <!-- General Settings -->
      <Card>
        <CardHeader>
          <CardTitle>Thiết lập chung</CardTitle>
          <CardDescription>
            Cấu hình cơ bản của hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <Label for="app-name">Tên ứng dụng</Label>
              <Input id="app-name" value="HNI Dashboard Operations" />
            </div>
            <div>
              <Label for="timezone">Múi giờ</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn múi giờ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC+7">UTC+7 (Việt Nam)</SelectItem>
                  <SelectItem value="UTC+8">UTC+8 (Singapore)</SelectItem>
                  <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <Label for="language">Ngôn ngữ</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label for="date-format">Định dạng ngày</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn định dạng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div class="flex justify-end">
            <Button>Lưu thay đổi</Button>
          </div>
        </CardContent>
      </Card>

      <!-- Security Settings -->
      <Card>
        <CardHeader>
          <CardTitle>Bảo mật</CardTitle>
          <CardDescription>
            Cài đặt bảo mật và xác thực
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <Label for="session-timeout">Thời gian hết hạn phiên (phút)</Label>
              <Input id="session-timeout" type="number" value="30" />
            </div>
            <div>
              <Label for="max-login-attempts">Số lần đăng nhập tối đa</Label>
              <Input id="max-login-attempts" type="number" value="5" />
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="two-factor" class="rounded" />
              <Label for="two-factor">Bật xác thực hai yếu tố (2FA)</Label>
            </div>
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="password-policy" class="rounded" checked />
              <Label for="password-policy">Áp dụng chính sách mật khẩu mạnh</Label>
            </div>
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="audit-log" class="rounded" checked />
              <Label for="audit-log">Ghi log hoạt động người dùng</Label>
            </div>
          </div>
          <div class="flex justify-end">
            <Button>Lưu thay đổi</Button>
          </div>
        </CardContent>
      </Card>

      <!-- Notification Settings -->
      <Card>
        <CardHeader>
          <CardTitle>Thông báo</CardTitle>
          <CardDescription>
            Cài đặt thông báo và email
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="email-notifications" class="rounded" checked />
              <Label for="email-notifications">Gửi thông báo qua email</Label>
            </div>
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="system-alerts" class="rounded" checked />
              <Label for="system-alerts">Cảnh báo hệ thống</Label>
            </div>
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="user-activity" class="rounded" />
              <Label for="user-activity">Thông báo hoạt động người dùng</Label>
            </div>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <Label for="smtp-server">SMTP Server</Label>
              <Input id="smtp-server" placeholder="smtp.example.com" />
            </div>
            <div>
              <Label for="smtp-port">SMTP Port</Label>
              <Input id="smtp-port" type="number" placeholder="587" />
            </div>
          </div>
          <div class="flex justify-end">
            <Button>Lưu thay đổi</Button>
          </div>
        </CardContent>
      </Card>

      <!-- System Information -->
      <Card>
        <CardHeader>
          <CardTitle>Thông tin hệ thống</CardTitle>
          <CardDescription>
            Thông tin về phiên bản và trạng thái hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <Label>Phiên bản ứng dụng</Label>
              <div class="text-sm text-muted-foreground">v2.1.0</div>
            </div>
            <div class="space-y-2">
              <Label>Phiên bản Node.js</Label>
              <div class="text-sm text-muted-foreground">v18.17.0</div>
            </div>
            <div class="space-y-2">
              <Label>Thời gian hoạt động</Label>
              <div class="text-sm text-muted-foreground">15 ngày, 3 giờ</div>
            </div>
            <div class="space-y-2">
              <Label>Trạng thái</Label>
              <div class="flex items-center space-x-2">
                <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                <span class="text-sm text-green-600">Hoạt động bình thường</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
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

// Set page meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Set page title
useHead({
  title: 'Cài đặt hệ thống - HNI Operations'
})
</script>
