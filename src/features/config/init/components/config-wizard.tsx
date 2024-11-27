'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useWizardStore } from '../useWizardStore'
import InventoryImportStep from './steps/inventory-import-step'
import RNMSNodesStep from './steps/rnms-nodes-step'
import ModeSelectionStep from './steps/mode-selection-step'

export default function ConfigWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const mode = useWizardStore((state) => state.mode)

  const steps = useMemo(() => {
    const baseSteps = [
      { title: 'Mode Selection', component: ModeSelectionStep },
    ]

    if (mode === 'standalone' || mode === 'rnms') {
      baseSteps.push({ title: 'Inventory Import', component: InventoryImportStep })
    } else if (mode === 'cmns') {
      baseSteps.push({ title: 'RNMS Nodes', component: RNMSNodesStep })
    }

    return baseSteps
  }, [mode])

  const CurrentStepComponent = steps[currentStep].component

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    const state = useWizardStore.getState()
    console.log('Form submitted:', state)
    // Here you would typically send the data to your backend
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(currentStep + 1) / steps.length * 100} className="mb-4" />
        <CurrentStepComponent />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </CardFooter>
    </Card>
  )
}

