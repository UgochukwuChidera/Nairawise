
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { Logo } from "@/components/logo"

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/30">
        <div className="mb-8 text-center">
            <Logo />
            <p className="text-muted-foreground mt-2">Welcome to NairaWise</p>
        </div>
        <Tabs defaultValue="login" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                Enter your credentials to access your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="signup">
            <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                Create an account to start managing your finances.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignupForm />
            </CardContent>
            </Card>
        </TabsContent>
        </Tabs>
    </div>
  )
}
