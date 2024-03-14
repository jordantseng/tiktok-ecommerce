import { Card, CardTitle, CardContent } from '@/components/ui/card'

type SpecCardProps = {
  specs: { key: string; value: string }[]
}

const SpecCard = ({ specs }: SpecCardProps) => {
  return (
    <Card className="m-2 border-none shadow-none">
      <CardTitle className="p-3 text-sm font-semibold">規格信息</CardTitle>
      <CardContent className="flex flex-col gap-2 px-3">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden rounded-lg border dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {specs.map((spec) => (
                      <tr className="flex" key={spec.key}>
                        <th className="flex w-24 overflow-x-scroll whitespace-nowrap bg-secondary px-4 py-4 text-sm font-medium">
                          {spec.key}
                        </th>
                        <td className="flex overflow-x-scroll whitespace-nowrap px-4 py-4 text-sm">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SpecCard
