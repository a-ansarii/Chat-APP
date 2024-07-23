import { useState, useEffect, useRef } from "react";
import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react"
import { app } from "./firebase"
import Message from "./Component/Message";
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import {getFirestore,addDoc, collection, query,orderBy,serverTimestamp, onSnapshot} from "firebase/firestore"

const auth = getAuth(app);
const db = getFirestore(app)

const logouttHandler = () => signOut(auth);


const loginHandler = () => {

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}
function App() {

  const [user, setUser] = useState(false);
  const [message , setMessage] = useState("");
  const [messages , setMessages] = useState([]);

  const divForScroll = useRef(null)

  const submitHandler = async(e) =>{
    e.preventDefault();

    try {
      setMessage("");

      await addDoc(collection(db , "Message"),{
        text: message,
        uid:user.uid,
        url:user.photoURL,
        createdAt:serverTimestamp(),

      });
      divForScroll.current.scrollIntoView({behavior : "smooth"});
    } catch (error) {
      alert(error);
    }
  }


  useEffect(() => {
    const q = query(collection(db , "Message") , orderBy("createdAt" , "asc"))

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data)
    });

   const unsubscribeForMsg = onSnapshot ( q , (snap)=>{
      setMessages(snap.docs.map((item)=> {
        const id = item.id;
        return { id , ...item.data()};
      }));
    })
    return () => {
      unsubscribe();
      unsubscribeForMsg();
    };
  }, [] )

  return (
    <Box bg={"red.50"}>
      {
        user ? (
          <Container h={"100vh"} bg={"white"}>
            <VStack h="full" paddingY={"4 "} >
              <Button onClick={logouttHandler} colorScheme="red" w={"full"}>
                Logout
              </Button>

              <VStack h="full" w={"full"} overflowY={"auto"} css={{"&::-webkit-scrollbar":{display : "none"}}} >
              {
                messages.map(item =>(
                  <Message 
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text = {item.text} 
                  url = {item.url} />
                ))
              }
              <div ref={divForScroll}></div>
              </VStack>

              <form onSubmit = {submitHandler} style={{ width: "100%" }}>
                <HStack>
                  <Input value={message} onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Enter a Message..." />
                  <Button colorScheme={"purple"} type="submit">Send</Button>
                </HStack>
              </form>
            </VStack>
          </Container>
        ) : <VStack justifyContent={"center"} h={"100vh"}>
          <Button onClick={loginHandler} colorScheme="red">Sign in with google</Button>
        </VStack>
      }
    </Box>
  );
}

export default App;
