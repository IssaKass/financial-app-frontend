import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Page from "@/layouts/Page";
import SettingsLayout from "@/layouts/SettingsLayout";
import SettingsSection from "@/layouts/SettingsSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

const PublicProfileFormSchema = z.object({
  company: z.string()
})

const ProfileSettingsPage = () => {
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(PublicProfileFormSchema),
    defaultValues: {
      company: userInfo.company || "",
    },
    mode: "onChange",
  });

  const handleSubmitForm = (data) => {
    console.log(data);
  }


  return (
    <Page title="Your profile">
      <SettingsLayout >
        <SettingsSection title="Public Profile">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6 max-w-[36rem]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="name" />
                    </FormControl>
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="organization" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" size="sm">
                Update Profile
              </Button>

            </form>
          </Form>
        </SettingsSection>
      </SettingsLayout>
    </Page>
  );
};

export default ProfileSettingsPage;
