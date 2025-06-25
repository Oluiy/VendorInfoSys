"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AdminLoginForm } from "@/components/forms/AdminLoginForm";
import { ManagerLoginForm } from "@/components/forms/ManagerLoginForm";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerAdmin } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  OfficerName: z.string().min(1, "Full name is required"),
  OfficerEmailAddress: z.string().email("Invalid email address"),
  OfficerPhoneNo: z.string().min(1, "Phone number is required"),
  OfficerPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminRegisterForm = ({ onSwitchToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await registerAdmin(data);
      toast({
        title: "Registration successful!",
        description: `Your Admin Officer ID is: ${
          res.OfficerID || res.id || "(unknown)"
        }`,
        duration: 2000,
      });
      reset();
      setTimeout(() => router.push("/admin"), 2000);
    } catch (err) {
      toast({
        title: "Registration failed",
        description: "Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Register as an Admin Officer
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="OfficerName">Full Name</Label>
          <Input
            id="OfficerName"
            {...register("OfficerName")}
            placeholder="John Doe"
          />
          {errors.OfficerName && (
            <p className="text-sm text-red-500">{errors.OfficerName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="OfficerEmailAddress">Email</Label>
          <Input
            id="OfficerEmailAddress"
            type="email"
            {...register("OfficerEmailAddress")}
            placeholder="john@example.com"
          />
          {errors.OfficerEmailAddress && (
            <p className="text-sm text-red-500">
              {errors.OfficerEmailAddress.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="OfficerPhoneNo">Phone Number</Label>
          <Input
            id="OfficerPhoneNo"
            {...register("OfficerPhoneNo")}
            placeholder="+2349056789780"
          />
          {errors.OfficerPhoneNo && (
            <p className="text-sm text-red-500">
              {errors.OfficerPhoneNo.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="OfficerPassword">Password</Label>
          <Input
            id="OfficerPassword"
            type="password"
            {...register("OfficerPassword")}
            placeholder="••••••••"
          />
          {errors.OfficerPassword && (
            <p className="text-sm text-red-500">
              {errors.OfficerPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </Button>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:underline font-medium bg-transparent border-0 p-0 cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-[400px] p-6">
        {!showRegister ? (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Select your role to sign in
              </p>
            </div>
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="admin">Admin Officer</TabsTrigger>
                <TabsTrigger value="manager">Manager</TabsTrigger>
              </TabsList>
              <TabsContent value="admin" className="pt-6">
                <div className="space-y-4">
                  <AdminLoginForm />
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">
                      Don't have an account?{" "}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowRegister(true)}
                      className="text-primary hover:underline font-medium bg-transparent border-0 p-0 cursor-pointer"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manager" className="pt-6">
                <div className="space-y-4">
                  <ManagerLoginForm />
                  <div
                    className="text-center text-sm invisible"
                    aria-hidden="true"
                  >
                    <span className="text-muted-foreground">.</span>
                    <button
                      className="text-primary hover:underline font-medium bg-transparent border-0 p-0"
                      tabIndex={-1}
                    >
                      .
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <AdminRegisterForm onSwitchToLogin={() => setShowRegister(false)} />
        )}
      </Card>
    </div>
  );
};

export default LoginPage;
