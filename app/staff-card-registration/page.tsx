import { redirect } from 'next/navigation'

export default function StaffCardRegistrationRedirect() {
  redirect('/staff-cards?tab=register')
}
