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
import { createBusinessUnit } from "@/lib/api";

const formSchema = z.object({
  BUnitName: z.string().min(2, "Name must be at least 2 characters."),
  Location: z.string().min(3, "Location must be at least 3 characters."),
});

export function RegisterBusinessUnitForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      BUnitName: "",
      Location: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    setError("");
    setSuccess(false);
    try {
      await createBusinessUnit(values);
      setSuccess(true);
      form.reset();
    } catch (err) {
      setError("Failed to register business unit.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Standalone Business Unit</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="BUnitName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Unit Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Maron Pancakes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Infront of Cafeteria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {success && (
              <div className="text-green-600 text-sm">
                Business unit registered!
              </div>
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Unit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
