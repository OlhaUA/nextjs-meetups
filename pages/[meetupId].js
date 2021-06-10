import MeetupDetail from '../components/meetups/MeetupDetail';

import { ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import {
  connectDatabase,
  getSelectedDocument,
  getAllId,
} from '../helpers/db-util';

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await connectDatabase();

  const meetups = await getAllId(client, 'meetups', {}, { _id: 1 });

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  // fetch
  const client = await connectDatabase();

  const selectedMeetup = await getSelectedDocument(client, 'meetups', {
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;
