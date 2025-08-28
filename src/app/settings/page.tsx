'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ThemeToggle } from '@/components/settings/theme-toggle'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { BudgetSettings } from '@/components/settings/budget-settings'
import { useSettings } from '@/context/settings-context'

export default function SettingsPage() {
  const { showMonetaryValues, toggleMonetaryValues } = useSettings();

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and application preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us a little bit about yourself" />
            </div>
            <Button>Update Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                Select the color scheme for the application.
              </p>
              <ThemeToggle />
            </div>
          </div>
        </CardContent>
      </Card>

      <BudgetSettings />
      
      <Card>
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
          <CardDescription>
            Control how your information is shared and displayed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-1">
              <Label>Private Account</Label>
              <p className="text-sm text-muted-foreground">
                Your profile and financial activity will not be visible to others.
              </p>
            </div>
            <Switch id="private-account" defaultChecked />
          </div>
           <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-1">
              <Label>Show Monetary Values</Label>
               <p className="text-sm text-muted-foreground">
                Display your financial figures. Disable to hide them across the app.
              </p>
            </div>
            <Switch 
              id="show-money" 
              checked={showMonetaryValues}
              onCheckedChange={toggleMonetaryValues}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-1">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive an email when there are important updates.
              </p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-1">
              <Label>Push Notifications</Label>
               <p className="text-sm text-muted-foreground">
                Get push notifications for bill reminders and budget alerts.
              </p>
            </div>
            <Switch id="push-notifications" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Update your personal information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="student@example.com" defaultValue="student@example.com" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
            </div>
            <Button>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  )
}
