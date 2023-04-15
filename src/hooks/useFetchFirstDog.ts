import { Auth } from "aws-amplify";
import { gql } from "graphql-request";
import log from "loglevel";
import { useEffect, useState } from "react";
import gqlClient from "~/utils/grqphql-client";

interface Member {
  name: string;
}
interface Dog {
  id: string;
  family: { members: { items: Member[] } };
}
interface QueryReturn {
  listDogs: {
    items: Dog[];
  };
}

export const useFetchFirstDog = () => {
  const [firstDog, setFirstDog] = useState<string>();

  useEffect(() => {
    const effect = async () => {
      const dogsQuery = gql`
        query {
          listDogs {
            items {
              family {
                members {
                  items {
                    name
                  }
                }
              }
              id
            }
          }
        }
      `;

      try {
        const qlProm = gqlClient.request<QueryReturn>(dogsQuery);
        const userProm = Auth.currentUserInfo();

        const [res, userData] = await Promise.all([qlProm, userProm]);

        const dogId = res.listDogs.items.find((dog) =>
          dog.family.members.items.find(
            (member) => member.name === userData.attributes.email
          )
        )?.id;

        setFirstDog(dogId);
      } catch (error) {
        log.error(
          "🚀 ~ file: my-family.tsx:202 ~ constgetStaticProps:GetStaticProps<pageProps>= ~ error:",
          error
        );
        setFirstDog(undefined);
      }
    };

    effect();
  }, []);

  return firstDog;
};
