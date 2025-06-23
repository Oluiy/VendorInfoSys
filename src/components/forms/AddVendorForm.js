"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  vendorName: z.string().min(2, "Name must be at least 2 characters."),
  vendorPhoneNo: z.string().min(10, "Please enter a valid phone number."),
  vendorEmail: z.string().email("Invalid email address."),
});

export function AddVendorForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorName: "",
      vendorPhoneNo: "",
      vendorEmail: "",
    },
  });

  async function onSubmit(values) {
    console.log("Submitting vendor:", values);
    try {
      await addVendor(values);
      // TODO: Add toast notification for success
      form.reset();
    } catch (error) {
      console.error("Failed to add vendor", error);
      // TODO: Add toast notification for error
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
              name="vendorName"
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
              name="vendorEmail"
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
              name="vendorPhoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Phone No.</FormLabel>
                  <FormControl>
                    <Input placeholder="+234 8196 7854 220" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Vendor</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
