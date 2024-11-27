import { create } from 'zustand'
import { Node, Edge } from 'reactflow'

type Topology = {
  nodes: Node[]
  edges: Edge[]
}

type WizardState = {
  mode: string
  rnmsNodes: Array<{ name: string; ip: string }>
  inventoryFile: string | null
  topology: Topology
  setMode: (mode: string) => void
  setRNMSNodes: (nodes: Array<{ name: string; ip: string }>) => void
  setInventoryFile: (file: string | null) => void
  setTopology: (topology: Topology) => void
}

export const useWizardStore = create<WizardState>((set) => ({
  mode: '',
  rnmsNodes: [],
  inventoryFile: null,
  topology: { nodes: [], edges: [] },
  setMode: (mode) => set({ mode }),
  setRNMSNodes: (nodes) => set({ rnmsNodes: nodes }),
  setInventoryFile: (file) => set({ inventoryFile: file }),
  setTopology: (topology) => set({ topology }),
}))

