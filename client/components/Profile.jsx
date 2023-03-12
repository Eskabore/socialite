import  ProfilePic from './ProfilePic';
import BioEditor from './BioEditor';

export default function Profile(props) {

    const { first, last, picture, bio, toggleUploader, bioUpdated } = props;

    // Add error handling for missing or invalid props
    if (!first || !last || !picture) {
        return <div>Error: missing props</div>;
    }

    // Check that picture is a valid URL
    const pictureUrl = new URL(picture);
    if (!pictureUrl.protocol.startsWith('http')) {
        return <div>Error: Invalid picture URL</div>;
    }

    return (
        <section className='profile'>
            <ProfilePic
                first={first}
                last={last}
                picture={picture}
                toggleUploader={toggleUploader}
                size="large"
            />

            <div className="user-info">
                <h2>Name:</h2>
                <p>{first} {last}</p>

                <h2>Bio:</h2>
                <BioEditor bio={bio} bioUpdated={bioUpdated} />
            </div>
        </section>
    );
}