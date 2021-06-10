import Head from 'next/head';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';

import { connectDatabase, getAllDocuments } from '../helpers/db-util';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Next.js Meetups App</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React / Next.js meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  // fetch from an API
  const client = await connectDatabase();

  const meetups = await getAllDocuments(client, 'meetups', { _id: -1 });

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
