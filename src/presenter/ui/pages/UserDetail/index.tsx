import * as React from 'react'
import {useLocation} from 'react-router-dom'
import SecuredLs from '../../../../utils/securedLs'
import {Link} from 'react-router-dom'

export default function UserDetail() {
  const location: any = useLocation()

  React.useEffect(() => {
    if (location.state) {
      SecuredLs
        .set('albumData', location.state.albumData)
    }
  }, [])

  return (
    <div className="flex flex-row justify-center">
      {
        location.state ? 
          location
            .state
            .albumData
            .user
            .name :
          SecuredLs
            .get('albumData')
            .albumData 
            .user 
            .name
      }
    </div>
  )
}
