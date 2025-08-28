
'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";

export default function VerifyPage() {
    const { subscribe } = useAuth();
    const router = useRouter();
    const [productId, setProductId] = useState('');

    const handleVerification = (e: React.FormEvent) => {
        e.preventDefault();
        if (productId.trim()) {
            subscribe();
            router.push('/');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
             <div className="absolute top-8 left-8">
                <Logo />
            </div>
            <Card className="w-full max-w-sm shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Verify Your Purchase</CardTitle>
                    <CardDescription>
                       Enter the product ID you received after payment to complete your subscription.
                    </CardDescription>
                </CardHeader>
                 <form onSubmit={handleVerification}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="product-id">Product ID</Label>
                            <Input 
                                id="product-id"
                                placeholder="Enter your product ID"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button 
                            type="submit" 
                            className="w-full" 
                            size="lg" 
                            disabled={!productId.trim()}
                        >
                            Complete Subscription
                        </Button>
                    </CardFooter>
                 </form>
            </Card>
        </div>
    )
}
