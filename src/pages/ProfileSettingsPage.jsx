import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Page from "@/layouts/Page";
import SettingsLayout from "@/layouts/SettingsLayout";
import SettingsSection from "@/layouts/SettingsSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";
import { fetchUser, updateUser } from "../features/user/userActions";

const PublicProfileFormSchema = z.object({
  name: z.string(),
  company: z.string()
})

const ProfileSettingsPage = () => {
  const { userInfo, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(PublicProfileFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    form.setValue("name", userInfo.name || "");
    form.setValue("company", userInfo.company || "");
  }, [userInfo])


  const handleSubmitForm = async (data) => {
    try {
      data = { ...data, user_id: userInfo.id }

      await dispatch(updateUser(data));

      dispatch(fetchUser(userInfo.id))
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }


  return (
    <Page title="Your profile">
      <SettingsLayout >
        <SettingsSection title="Public Profile">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6 max-w-[36rem]">
              <fieldset className="space-y-6" disabled={loading}>
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
              </fieldset>
              <Button type="submit" size="sm" disabled={loading}>
                {loading && <Loader className="me-2 animate-spin" size={16} />}
                {!loading ? "Update Profile" : "Updating..."}
              </Button>
            </form>
          </Form>
        </SettingsSection>
      </SettingsLayout>
    </Page>
  );
};

export default ProfileSettingsPage;
