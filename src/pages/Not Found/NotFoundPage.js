import Section from "../../components/UI/Section";

const NotFoundPage = (props) => {
    return (
        <Section className={`${props.className} section-message`}>
            <i className="fa-solid fa-link-slash"></i>
            <h1>Page not found.</h1>
        </Section>
    );
};

export default NotFoundPage;
