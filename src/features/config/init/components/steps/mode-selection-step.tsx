import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useWizardStore } from '../../useWizardStore'

export default function ModeSelectionStep() {
  const { mode, setMode } = useWizardStore()

  return (
    <div className="space-y-4">
      <Label>Select Operation Mode</Label>
      <RadioGroup
        onValueChange={setMode}
        value={mode}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="standalone" id="standalone" />
          <Label htmlFor="standalone">Standalone</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cmns" id="cmns" />
          <Label htmlFor="cmns">CMNS (Centralized Monitoring and Notification System)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rnms" id="rnms" />
          <Label htmlFor="rnms">RNMS (Remote Network Monitoring System)</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

