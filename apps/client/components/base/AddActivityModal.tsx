import React, { useState } from "react"
import { ActivityType } from "@/types/metric"
import { fetcher } from "@/utils/fetcher"

interface IProps {
  selectedDate: Date
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

const isDecimalAllowed = (type: ActivityType) =>
  type === ActivityType.SLEEP || type === ActivityType.EXERCISE

export const AddActivityModal: React.FC<IProps> = ({
  selectedDate,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [type, setType] = useState<ActivityType>(ActivityType.STEPS)
  const [value, setValue] = useState<string>("")

  if (!isOpen) return <></>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const parsedValue = Number(value)
    if (!Number.isFinite(parsedValue) || parsedValue < 0) return

    if (!isDecimalAllowed(type) && !Number.isInteger(parsedValue)) return

    const payload: { minutes?: number; steps?: number; hours?: number } = {}
    if (type === ActivityType.EXERCISE) {
      payload.minutes = parsedValue
    } else if (type === ActivityType.STEPS) {
      payload.steps = parsedValue
    } else if (type === ActivityType.SLEEP) {
      payload.hours = parsedValue
    }

    try {
      await fetcher(`/${type}`, "POST", {
        dateString: selectedDate.toISOString(),
        ...payload,
      })

      onSubmit()
      setValue("")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded bg-white p-6">
        <h3 className="mb-4 text-lg font-medium">Add Activity</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="mb-1 block text-sm">Activity</label>
            <select
              value={type}
              onChange={(e) => {
                const nextType = e.target.value as ActivityType
                setType(nextType)
                setValue("")
              }}
              className="w-full rounded border p-2"
            >
              <option value={ActivityType.STEPS}>Steps</option>
              <option value={ActivityType.SLEEP}>Sleep (hrs)</option>
              <option value={ActivityType.EXERCISE}>Exercise (min)</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm">Value</label>
            <input
              type="number"
              step={isDecimalAllowed(type) ? 0.1 : 1}
              min="0"
              value={value}
              onChange={(e) => {
                const nextValue = e.target.value
                if (isDecimalAllowed(type)) {
                  setValue(nextValue)
                  return
                }

                setValue(nextValue.replace(/[^0-9]/g, ""))
              }}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-3 py-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-primary px-3 py-1 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddActivityModal
