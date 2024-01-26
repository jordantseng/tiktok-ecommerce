import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash2Icon } from 'lucide-react'

type Props = {
  onConfirm: () => void
}

const ConfirmDeleteDialog = ({ onConfirm }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-red-400">
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>提示</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">確定要刪除此筆內容嗎？</div>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              取消
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="default" onClick={onConfirm}>
              確認
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default ConfirmDeleteDialog
