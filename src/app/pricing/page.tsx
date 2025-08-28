
'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/auth-context";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";

export default function PricingPage() {
    const { subscribe } = useAuth();
    const router = useRouter();
    const [productId, setProductId] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (productId.trim()) {
            subscribe();
            router.push('/');
        }
    }

    const features = [
        "Smart Finance Assistant",
        "Budget Planning & Tracking",
        "Bill Management",
        "Interactive Finance Blog",
        "Community Discussion Hub",
        "Detailed Analytics"
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
             <div className="absolute top-8 left-8">
                <Logo />
            </div>
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Get Full Access</CardTitle>
                    <CardDescription>
                        Unlock all features and take control of your finances.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center">
                        <span className="text-4xl font-bold">₦1500</span>
                        <span className="text-muted-foreground">/month</span>
                    </div>

                    <ul className="space-y-3">
                       {features.map(feature => (
                         <li key={feature} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-muted-foreground">{feature}</span>
                         </li>
                       ))}
                    </ul>

                     <div className="text-center text-xs text-muted-foreground">
                        Plan is non-refundable.
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <form onSubmit={handleSubscribe} className="w-full space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="product-id">Product ID</Label>
                            <Input 
                                id="product-id"
                                placeholder="Enter your product ID"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="auto-renew" defaultChecked />
                            <Label htmlFor="auto-renew">Auto-renew subscription</Label>
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full" 
                            size="lg" 
                            disabled={!productId.trim()}
                        >
                            Subscribe Now
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}
