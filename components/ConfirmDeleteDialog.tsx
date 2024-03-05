import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'

type Props = {
  onConfirm: () => void
}

const ConfirmDeleteDialog = ({ onConfirm }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="px-1 text-red-400">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>提示</AlertDialogTitle>
          <AlertDialogDescription>確定要刪除此筆內容嗎？</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-background">取消</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>確認</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default ConfirmDeleteDialog
