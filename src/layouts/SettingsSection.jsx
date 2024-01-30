import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"

const SettingsSection = ({ title, children }) => {
  return (
    <div className='space-y-6'>
      <div>
        <Typography variant="h5" component="h3">{title}</Typography>
        <Separator className="mt-1" />
      </div>
      {children}
    </div>
  )
}

export default SettingsSection