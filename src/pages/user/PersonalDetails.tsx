import { useState } from "react";
import PersonalDetailsForm from "@/components/user/PersonalDetailsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent>
        <PersonalDetailsForm />
      </CardContent>
    </Card>
  );
};

export default PersonalDetails;