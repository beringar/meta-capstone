import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ReservationForm = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      date: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: (values) => {
      submit("https://john.com/contactme", values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      date: Yup.string().required("Required"),
      comment: Yup.string()
        .min(25, "Must be at least 25 characters")
        .required("Required"),
    }),
  });

  useEffect(() => {
    if (response) {
      console.log(response.type, response.message);
      onOpen(response.type, response.message);
      if (response.type === "success") {
        formik.resetForm();
      }
    }
  }, [response]);

  return (
    <VStack p={32} alignItems="flex-start">
      <Heading as="h1" id="contactme-section">
        Contact me
      </Heading>
      <Box p={6} rounded="md" w="100%">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4}>
            <FormControl
              isInvalid={!!formik.errors.firstName && formik.touched.firstName}
            >
              <FormLabel htmlFor="firstName">Name</FormLabel>
              <Input
                id="firstName"
                name="firstName"
                {...formik.getFieldProps("firstName")}
              />
              <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.firstName && formik.touched.firstName}
            >
              <FormLabel htmlFor="date">Date</FormLabel>
              <Input
                id="date"
                name="date"
                type="date"
                {...formik.getFieldProps("date")}
              />
              <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.email && formik.touched.email}
            >
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                {...formik.getFieldProps("email")}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="type">Type of enquiry</FormLabel>
              <Select id="type" name="type" {...formik.getFieldProps("type")}>
                <option value="hireMe">Freelance project proposal</option>
                <option value="openSource">
                  Open source consultancy session
                </option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.comment && formik.touched.comment}
            >
              <FormLabel htmlFor="comment">Your message</FormLabel>
              <Textarea
                id="comment"
                name="comment"
                height={250}
                {...formik.getFieldProps("comment")}
              />
              <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              colorScheme="purple"
              width="full"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
};

export default ReservationForm;