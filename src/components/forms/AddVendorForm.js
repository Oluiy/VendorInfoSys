"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addVendor } from "@/lib/api";

const formSchema = z.object({
  VendorName: z.string().min(2, "Name must be at least 2 characters."),
  VendorPhoneNo: z.string().min(7, "Please enter a valid phone number."),
  VendorEmail: z.string().email("Invalid email address."),
});

export function AddVendorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      VendorName: "",
      VendorPhoneNo: "",
      VendorEmail: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    setError("");
    setSuccess(false);
    try {
      await addVendor(values);
      setSuccess(true);
      form.reset();
    } catch (err) {
      setError("Failed to onboard vendor.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboard New Vendor</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="VendorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Anthony Randall" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="VendorEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Email</FormLabel>
                  <FormControl>
                    <Input placeholder="contact@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="VendorPhoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Phone No.</FormLabel>
                  <FormControl>
                    <Input placeholder="+2348061374153" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {success && (
              <div className="text-green-600 text-sm">
                Vendor onboarded successfully!
              </div>
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Onboarding..." : "Add Vendor"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
