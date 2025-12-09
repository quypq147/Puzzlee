// app/dashboard/events/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AdminDialogPage() {
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [name, setName] = React.useState("");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl border-slate-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">Admin</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setOpenInfo(true)}>About</Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setOpenCreate(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Slido
              </Button>
            </div>
          </div>
          <p className="text-sm text-slate-600">Manage your slidos, team, and preferences in a focused dialog-style panel.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold text-slate-800 mb-2">Quick Actions</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setOpenCreate(true)}>New Event</Button>
                <Button variant="outline">Invite Team</Button>
                <Button variant="outline">Open Tutorials</Button>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-slate-800 mb-2">Support</h3>
              <p className="text-sm text-slate-600">Need help? Visit the Help Center or contact support.</p>
              <div className="mt-3">
                <Button variant="outline">Help Center</Button>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Info dialog */}
      <Dialog open={openInfo} onOpenChange={setOpenInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Panel</DialogTitle>
            <DialogDescription>Dialog-like design for managing your organization.</DialogDescription>
          </DialogHeader>
          <div className="text-sm text-slate-700">
            Use the sidebar to navigate core areas. This page surfaces key actions in a centered panel for quick access.
          </div>
        </DialogContent>
      </Dialog>

      {/* Create event dialog */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Tạo event</DialogTitle>
            <DialogDescription>Set basic details for your slido event.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600">Start date</label>
                <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600">End date</label>
                <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600">Slido name</label>
              <Input placeholder="Enter a name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-2 border rounded-md px-3 py-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border">i</span>
              Anyone with the code or link can participate
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenCreate(false)}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setOpenCreate(false)}>Create slido</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
