import BackButton from "../../components/BackButton";
import PostTitle from "./PostTitle";
import Dates from "./Dates";
import List from "./List";
import ApplicationForm from "./ApplicationForm";

export default function CareerDetailPage() {
  const responsibilitesList = [
    {
      id: 1,
      point:
        "Design visually appealing and intuitive user interfaces for web and mobile apps.",
    },
    {
      id: 2,
      point:
        "Create wireframes, mockups, and prototypes for design feedback and iteration.",
    },
    {
      id: 3,
      point:
        "Ensure designs are responsive and user-centric across various devices.",
    },
    {
      id: 4,
      point:
        "Collaborate with cross-functional teams and stakeholders, communicating design decisions effectively.",
    },
    {
      id: 5,
      point:
        "Stay updated on UI/UX trends and contribute to design guidelines and standards.",
    },
    {
      id: 6,
      point:
        "Conduct quality assurance checks and maintain design documentation.",
    },
    {
      id: 7,
      point:
        "Seek continuous improvement through design critiques and skill enhancement.",
    },
  ];

  const qualificationList = [
    {
      id: 1,
      point:
        "Bachelor's degree in Graphic Design, HCI, Computer Science, or related field.",
    },
    {
      id: 2,
      point:
        "Proven experience as a UI Designer or similar role, with a strong portfolio showcasing UI design projects and proficiency in design tools such as Sketch, Adobe XD, Figma, or similar.",
    },
    {
      id: 3,
      point:
        "Solid understanding of user-centered design principles, usability best practices, and interaction design concepts.",
    },
    {
      id: 4,
      point:
        "Excellent communication, collaboration, and problem-solving skills, with the ability to articulate design decisions and incorporate feedback effectively.",
    },
    {
      id: 5,
      point:
        "Familiarity with front-end development technologies (HTML, CSS, JavaScript) is a plus.",
    },
    {
      id: 6,
      point:
        "Experience with motion design, animation, and/or illustration is desirable.",
    },
    {
      id: 6,
      point:
        "Ability to thrive in a fast-paced, dynamic environment and manage multiple projects with competing priorities.",
    },
  ];
  return (
    <div className="px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 py-6 pb-40 flex flex-col gap-10">
      <BackButton />
      <PostTitle />
      <Dates />
      <List data={responsibilitesList} title={"Responsibilities"} />
      <List dots data={qualificationList} title={"Qualifications"} />
      <ApplicationForm />
    </div>
  );
}
