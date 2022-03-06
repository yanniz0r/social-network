import { NextPage } from "next";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { FaAddressCard, FaLock, FaUser, FaUserSecret } from "react-icons/fa";
import Container from "../../components/container";
import GeneralSettings from "../../components/settings/general-settings";
import PrivacySettings from "../../components/settings/privacy-settings";
import ProfileSettings from "../../components/settings/profile-settings";
import SecuritySettings from "../../components/settings/security-settings";
import SignedInLayout from "../../layouts/signed-in-layout";

interface Section {
  id: string
  name: string
  icon: ReactNode
  component: ReactNode
}

interface SettingsPageProps {
  selectedSection: string
}

const SettingsPage: NextPage<SettingsPageProps> = (props) => {

  const sections: Section[] = [
    {
      id: 'general',
      name: 'Generelles',
      icon: <FaAddressCard />,
      component: <GeneralSettings />
    },
    {
      id: 'profile',
      name: 'Profil',
      icon: <FaUser />,
      component: <ProfileSettings />,
    },
    {
      id: 'privacy',
      name: 'Privatsphäre',
      icon: <FaUserSecret />,
      component: <PrivacySettings />
    },
    {
      id: 'security',
      name: 'Passwort & Sicherheit',
      icon: <FaLock />,
      component: <SecuritySettings />
    },
  ]

  const section = useMemo(() => {
    return sections.find(sectionPredicate => props.selectedSection === sectionPredicate.id)
  }, [props.selectedSection])

  return <SignedInLayout navigationSpace>
    <Container className="flex flex-row">
      <div className="border-r border-slate-200 pr-5 py-5 w-1/5 flex flex-col gap-2.5">
        {sections.map((section) => (
          <Link href={`/settings/${section.id}`} key={section.id}>
            <a className="hover:bg-blue-100 flex px-4 py-2 rounded-lg items-center gap-2.5">
              {section.icon}
              {section.name}
            </a>
          </Link>
        ))}
      </div>
      <div className="pl-5 py-5 w-4/5">
        <h1 className="text-4xl">{section?.name}</h1>
        <div className="pt-5">

        </div>
        {section?.component}
      </div>
    </Container>
  </SignedInLayout>
}

export default SettingsPage

SettingsPage.getInitialProps = (context) => {
  return {
    selectedSection: context.query.section as string
  }
}
