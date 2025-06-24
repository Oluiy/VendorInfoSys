"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { login as loginApi } from "@/lib/api";

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
  managerId: z.string().min(1, "Manager ID is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export function ManagerLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      managerId: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    setError("");
    try {
      const user = await loginApi({
        role: "manager",
        id: values.managerId,
        password: values.password,
      });
      login({ ...user, role: "manager" });
    } catch (err) {
      setError("Invalid Manager ID or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="managerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manager ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g., MGR12345" {...field} />
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
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
