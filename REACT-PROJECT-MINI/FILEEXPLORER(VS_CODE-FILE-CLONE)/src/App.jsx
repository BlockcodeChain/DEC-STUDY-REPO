import React, { useState } from 'react'
import FileExplorer from './Components/data/folderData.js'
import Folder from './Components/Folder.jsx'

const App = () => {
  const [explorer, setExplorer] = useState(FileExplorer)

  console.log(explorer)   // logging here is correct

  return (
    <div>
      <Folder FileExplorer={explorer}/>
      App Loaded
    </div>
  )
}

export default App
