import React from 'react'
import {HStack , Avatar , Text} from '@chakra-ui/react'

const Message = ({text , url , user = "other"}) => {
  return (
    <HStack borderRadius={"base"} alignSelf = {user === "me" ?"flex-end" : "flex-start"} bg={"gray.100"} paddingX={user === "me"?"4" : "2"} paddingY={"2"}>
       
       {
            user === "other" && <Avatar src={url}/>
        }
        <Text>
            {text}
        </Text>
        {
            user === "me" && <Avatar src={url}/>
        }
    </HStack>
  )
}

export default Message