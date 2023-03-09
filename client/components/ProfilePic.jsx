// ProfilePic displays image with joined first and last name in alt attribute. If there is no profilePicUrl, a default user image is displayed.
export default function ProfilePic (props) {

    return (
        <>
            <img src={props.picture || "/avatardefault.png"} alt={`${props.first} ${props.last}`} onClick={ props.toggleUploader }/>
        </>
    );
}