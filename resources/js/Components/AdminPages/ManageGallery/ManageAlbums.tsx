import { Link } from '@inertiajs/react'
import { Album } from '../../../DataStructures/data_interfaces'
import Card from '../../../ui/card/Card'
import CardHeader from '../../../ui/card/CardHeader'
import Pagination from '../../../ui/table/Pagination'
import Table from '../../../ui/table/Table'
import { Paginator } from '../../../ui/ui_interfaces'

const heads = ['AlbumView Name']

const ManageAlbums = ({ albums }: { albums: Paginator<Album> }) => {
  return (
    <Card>
      <CardHeader
        title='Albums List'
        add='/manage-gallery/create'
      />

      <div className='mt-10 flex flex-col'>
        <Table
          heads={heads}
          editColumn={true}
        >
          <>
            <tbody>
              {albums.data.map((album) => {
                return (
                  <tr
                    className='border-b hover:bg-gray-100'
                    key={album.id.toString()}
                  >
                    <td className='text-skin-base whitespace-nowrap px-6  py-4'>{album.name}</td>
                    <td className=' whitespace-nowrap px-6 py-4'>
                      <Link
                        href={'/manage-gallery/' + album.id}
                        className='cursor-pointer text-blue-400 hover:text-blue-600'
                        as='span'
                      >
                        VIEW
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </>
        </Table>
      </div>

      <div className='my-5'>
        <Pagination pagination={albums} />
      </div>
    </Card>
  )
}

export default ManageAlbums
