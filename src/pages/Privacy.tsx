import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Badge, Section } from '../components/ui'
import { getCanonical } from '../lib/seo'

const Privacy: React.FC = () => (
  <>
    <Helmet>
      <title>Privacy Notice | AEEM</title>
      <meta name="description" content="Privacy notice for information submitted through the Africa Education Empowerment Movement website." />
      <link rel="canonical" href={getCanonical('/privacy')} />
      <meta property="og:title" content="Privacy Notice | AEEM" />
      <meta property="og:description" content="How AEEM's website handles information submitted through its forms." />
      <meta property="og:url" content={getCanonical('/privacy')} />
    </Helmet>

    <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
      <div className="max-w-3xl">
        <Badge>Privacy</Badge>
        <h1 className="mt-5 text-4xl font-bold leading-tight text-aeem-ink dark:text-white sm:text-5xl">Privacy notice</h1>
        <p className="mt-6 text-lg leading-8 text-aeem-ink/70 dark:text-white/70">
          This notice describes the information the current AEEM website asks you to provide through its public forms and how those forms are intended to be used.
        </p>
      </div>
    </Section>

    <Section>
      <article className="prose prose-lg max-w-3xl text-aeem-ink dark:prose-invert">
        <h2>Information you choose to submit</h2>
        <p>The website may collect your name, email address, phone number, organization or institution, and the message you provide when you submit a contact or involvement inquiry. Newsletter subscriptions collect your email address.</p>
        <h2>Why we collect it</h2>
        <p>These details are used to respond to inquiries, understand requests to work with AEEM, and manage newsletter subscriptions.</p>
        <h2>Service provider</h2>
        <p>The current application sends form submissions to Supabase, which provides the application's database service. AEEM should maintain its production database access controls, retention rules, and any required legal documentation separately from this page.</p>
        <h2>What not to submit</h2>
        <p>Do not submit passwords, identity documents, financial account information, authentication credentials, or other highly sensitive information through general website forms.</p>
        <h2>Local browser storage</h2>
        <p>The application may use browser local storage for limited interface preferences and duplicate-submission protection. This is separate from the information submitted to AEEM's database.</p>
        <h2>Questions or requests</h2>
        <p>If you have a question about information you submitted through this website, contact AEEM directly.</p>
        <p><Link to="/contact" className="font-semibold text-aeem-forest underline underline-offset-4 dark:text-aeem-gold-light">Contact AEEM</Link></p>
        <div className="mt-10 border-l-4 border-aeem-gold pl-5 text-base">
          <p><strong>Important:</strong> This page documents the behavior currently implemented in the application. It is not a substitute for a complete jurisdiction-specific privacy policy, records-retention policy, or legal review.</p>
        </div>
      </article>
    </Section>
  </>
)

export default Privacy
