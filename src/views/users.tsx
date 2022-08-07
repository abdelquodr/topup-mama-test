import React, { useState, useEffect } from 'react'
import AuthService from '../utilities/authService'
import { Pagination } from '../components'


type  UsersType = {
  [key: string]: any;
};

const Users = () => {
// state
  const [ users, setUsers] = useState<UsersType>({});
  const [pageNum, setPageNum] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // Effect
  useEffect(() => {
    (async() => {
      const response = await AuthService.getUsers(pageNum);
      setUsers(response)
      console.log(response, "pages")
      setTotalPages(response?.data?.total_pages)
    })();

  }, [pageNum])


  // handlers
  const handlePrevPage = (prevPage: number) => {
    setPageNum((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    console.log(nextPage);
    setPageNum((nextPage) => nextPage + 1);
  };


  return (
    <div className="mt-5">
      <ul>
        <h2 className="text-primary ml-2 ">Users List</h2>
        { users.data && users.data.data.map((user: any ) => <li key={user.id} className="text-muted font-weight-bold py-3 mx-2 list-unstyled">{user.first_name} {user.last_name}</li>)  }
      </ul>

      { users.data && <Pagination
        totalPages={totalPages}
        currentPage={pageNum}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />}
    </div>
  )
}

export default Users