// 7/2/2022 Stream Attempt

import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";
import { connect } from "react-redux";

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

// const filters = {type: 'messaging', members: {$in: [user.id]}}
const sort = { last_message_at: -1 };

const CustomChannelPreview = (props) => {
  const { channel, setActiveChannel } = props;
  const { messages } = channel.state;
  const lastMessage = messages[messages.length - 1];

  return (
    <button
      onClick={() => setActiveChannel(channel)}
      style={{ margin: "12px" }}
    >
      <div>{channel.data.name || "Unnamed Channel"}</div>
      <div style={{ fontSize: "14px" }}>{lastMessage.text}</div>
    </button>
  );
};
// function CustomChannelHeader() {
//   const { channel } = useChatContext()
//   const { data }  = channel

//   return (
//     <header
//     style = {{
//       height: '40px',
//       backgroundColor: 'white',
//       marginBottom: '20px',
//       borderRadius: '10px',
//       padding: '10px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       fontSize: '20px',
//       fontWeight: 'bold',
//       color: '#333',
//       fontFamily: 'sans-serif',
//       boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
//       border: '1px solid #ccc',
//     }}>
//       {data.image && (
//       <img
//       src={data.image}
//       alt="channel"
//       style={{
//         width: 20,
//         height: 20,
//         borderRadius: '50%',
//          marginRight: 10
//         }}
//         />)}
//      {data.name}

//     </header>
//   )
// }

const ChatComp = ({ stream_token, currentUser }) => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function init() {
      const user = {
        id: currentUser.id.toString(),
        name: currentUser.first_name + " " + currentUser.last_name,
        image:
          "https://nintendosoup.com/random-pokemon-sword-shield-art-director-shares-bizarre-fan-art-of-buff-kirby/",
      };
      const chatClient = new StreamChat.getInstance(apiKey);

      await chatClient.connectUser(user, stream_token);
      const channel = chatClient.channel(
        "team",
        "b57e4c7a-3f32-4fa3-8cd1-44bc66b64663t",
        {
          image:
            "https://cdn.myminifactory.com/assets/object-assets/5e980b0d9169f/images/720X720-img-0353.JPG",
          name: "Team Chat",
          members: [user.id],
        }
      );
      await channel.watch();
      setChannel(channel);
      setClient(chatClient);
    }
    if (currentUser) init();

    if (client) return () => client.disconnectUser();
  }, [currentUser, client, stream_token]);
  if (!channel || !client) return <LoadingIndicator />;

  return (
    <div>
      <Chat client={client} theme="messaging light">
        <ChannelList
          // filters={filters}
          sort={sort}
          Preview={CustomChannelPreview}
        />
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stream_token: state.auth.stream_token,
  currentUser: state.auth.user,
});

export default connect(mapStateToProps)(ChatComp);
