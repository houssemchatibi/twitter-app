import React from 'react'
import { IoSettingsOutline } from 'react-icons/io5'

const NotificationPage = () => {
  return (
    <>
      <div className='flex-[4_4_0] border-l border-r border-gray-700 min-h-screen'>
      <div className='flex justify-between items-center p-4 border-b border-gray-700'>
      <p className='font-bold'>Notifications</p>
      <div className='dropdown '>
 
						<div tabIndex={0} role='button' className='m-1'>
							<IoSettingsOutline className='w-4' />
						</div>
                        <ul
							tabIndex={0}
							className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
						>
							<li>
								<a onClick={deleteNotifications}>Delete all notifications</a>
							</li>
						</ul>
      </div>
      </div>
      </div>
    </>
  )
}

export default NotificationPage
