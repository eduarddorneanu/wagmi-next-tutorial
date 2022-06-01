import { Button, Center, Heading, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useConnect, useDisconnect } from "wagmi";

const Home: NextPage = () => {
  const { connect, connectors, isConnecting, isConnected } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <Center flexDir="column" p={20}>
      {isConnected ? (
        <Heading>Connected to wallet!</Heading>
      ) : (
        <Heading>Connect in order to continue</Heading>
      )}
      {!isConnected &&
        connectors.map((connector) => (
          <Button
            size="lg"
            bgColor="#2C2A6C"
            mt="5"
            key={connector.id}
            onClick={() => {
              connect(connector);
            }}
          >
            {isConnecting ? <Spinner /> : `Connect with ${connector.name}`}
          </Button>
        ))}
      {isConnected && (
        <Button
          size="lg"
          bgColor="#2c2A6c"
          mt="5"
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </Button>
      )}
    </Center>
  );
};

export default Home;
