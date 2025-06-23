"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  vendorId: z.string().min(1, "Vendor ID is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export function VendorLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorId: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    console.log("Vendor login attempt:", values);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Vendor login successful");
    login({ role: "vendor", name: "Mock Vendor" });
    setIsLoading(false);
    // TODO: Handle actual login and redirection
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="vendorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g., VEN98765" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
