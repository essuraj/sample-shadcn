/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useWizardStore } from '../../useWizardStore'

export default function RNMSNodesStep() {
  const { rnmsNodes, setRNMSNodes } = useWizardStore()
  const [newNode, setNewNode] = useState({ name: '', ip: '' })

  const addNode = () => {
    if (newNode.name && newNode.ip) {
      const updatedNodes = [...rnmsNodes, newNode]
      setRNMSNodes(updatedNodes)
      setNewNode({ name: '', ip: '' })
    }
  }

  const onDrop = (acceptedFiles: any[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onload = () => {
      // Here you would parse the Excel file and create nodes
      // For this example, we'll just add a dummy node
      const dummyNode = { name: 'Imported Node', ip: '192.168.1.1' }
      const updatedNodes = [...rnmsNodes, dummyNode]
      setRNMSNodes(updatedNodes)
    }

    reader.readAsArrayBuffer(file)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.xlsx, .xls' as any })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Add RNMS Node</h3>
        <div className="mt-2 space-y-4">
          <div>
            <Label htmlFor="nodeName">Node Name</Label>
            <Input
              id="nodeName"
              value={newNode.name}
              onChange={(e) => setNewNode({ ...newNode, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="nodeIp">IP Address</Label>
            <Input
              id="nodeIp"
              value={newNode.ip}
              onChange={(e) => setNewNode({ ...newNode, ip: e.target.value })}
            />
          </div>
          <Button onClick={addNode}>Add Node</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Bulk Import RNMS Nodes</h3>
        <div {...getRootProps()} className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the Excel file here ...</p>
          ) : (
            <p>Drag 'n' drop an Excel file here, or click to select one</p>
          )}
        </div>
      </div>

      {rnmsNodes.length > 0 && (
        <div>
          <h3 className="text-lg font-medium">RNMS Nodes</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Node Name</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rnmsNodes.map((node, index) => (
                <TableRow key={index}>
                  <TableCell>{node.name}</TableCell>
                  <TableCell>{node.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

