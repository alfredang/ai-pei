import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'Tertiary Infotech Academy - AI-Powered Solutions for Education, HR & Enterprise',
  description = 'Professional software development, AI solutions, LMS platforms, HR systems, and enterprise applications. Expert consulting services in Singapore specializing in modern web technologies.',
  keywords = 'software development singapore, AI solutions, learning management system, HR management, enterprise software, web development, react development, next.js, AI chatbot, machine learning, singapore tech company',
  author = 'Tertiary Infotech Academy Pte. Ltd.',
  image = '/screenshot.png',
  url = 'https://www.tertiaryinfotech.com',
  type = 'website',
}) => {
  const siteTitle = 'Tertiary Infotech Academy'
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* AI Search & Overview Optimization */}
      <meta name="classification" content="Technology, Software Development, AI Solutions" />
      <meta name="category" content="Business & Technology" />
      <meta name="coverage" content="Singapore" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Schema.org markup for better AI understanding */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Tertiary Infotech Academy Pte. Ltd.',
          url: 'https://www.tertiaryinfotech.com',
          logo: '/logo.png',
          description: description,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'SG',
            addressLocality: 'Singapore',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+65-6100-0613',
            contactType: 'customer service',
            email: 'enquiry@tertiaryinfotech.com',
          },
          sameAs: [
            'https://www.linkedin.com/in/angchewhoe/',
            'https://github.com/alfredang',
          ],
        })}
      </script>
    </Helmet>
  )
}

export default SEO
