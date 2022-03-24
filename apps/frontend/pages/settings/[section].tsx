import { NextPage } from "next";
import Head from "next/head";
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
    <Head>
      <title>{section?.name} &middot; Einstellungen</title>
    </Head>
    <Container className="flex flex-row divide-x divide-slate-200 dark:divide-slate-700">
      <div className="pr-5 py-10 w-3/12 flex flex-col gap-2.5">
        {sections.map((section) => (
          <Link href={`/settings/${section.id}`} key={section.id}>
            <a className="hover:bg-blue-500 dark:hover:bg-blue-600 group flex px-4 py-2 rounded-lg items-center gap-2.5 transition transform hover:scale-105 hover:shadow">
              <span className="text-slate-500 group-hover:text-blue-200">{section.icon}</span>
              <span className="text-slate-900 dark:text-slate-300 group-hover:text-white">{section.name}</span>
            </a>
          </Link>
        ))}
      </div>
      <div className="pl-10 py-10 w-9/12">
        <h1 className="text-4xl text-slate-900 dark:text-slate-100">{section?.name}</h1>
        <div className="pt-5">
          {section?.component}
        </div>
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
