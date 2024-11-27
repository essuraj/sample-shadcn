/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useWizardStore } from '../../useWizardStore'

export default function InventoryImportStep() {
  const { inventoryFile, topology, setInventoryFile, setTopology } = useWizardStore()

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Here you would parse the Excel file and create nodes and edges
      // For this example, we'll just create some dummy data
      const dummyTopology = {
        nodes: [
          { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
          { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
          { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2' },
          { id: 'e1-3', source: '1', target: '3' },
        ],
      }
      setTopology(dummyTopology)
      setInventoryFile(file.name)
    }
    reader.readAsArrayBuffer(file)
  }, [setTopology, setInventoryFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.xlsx, .xls' as any })

  return (
    <div className="space-y-6">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the Excel file here ...</p>
        ) : (
          <p>Drag 'n' drop an Excel file here, or click to select one</p>
        )}
      </div>
      {inventoryFile && (
        <div>
          <Label>Uploaded file: {inventoryFile}</Label>
        </div>
      )}
      <div style={{ height: 400 }}>
        <ReactFlow
          nodes={topology.nodes}
          edges={topology.edges}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <Button onClick={() => console.log('Save topology')}>Save Topology</Button>
    </div>
  )
}

