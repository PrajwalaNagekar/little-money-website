import React from 'react';
import FooterOne from '../common/footer/FooterOne';
import HeaderOne from '../common/header/HeaderOne';
import CtaLayoutOne from '../component/cta/CtaLayoutOne';
import BreadCrumbOne from '../elements/breadcrumb/BreadCrumbOne';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import SEO from '../common/SEO';


const PrivacyPolicy = () => {

    return (
        <>
            <SEO title="Privacy Policy" />
            {/* <ColorSwitcher /> */}
            <main className="main-wrapper">
                <HeaderOne />
                <BreadCrumbOne
                    title="Privacy Policy"
                // page="Privacy Policy"
                />
                <div className="section-padding privacy-policy-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="privacy-policy-content">
                                    {/* <div className="section-title">
                                    <h5 className="title">This Privacy policy was published on September 10th, 2021.</h5>
                                </div> */}
                                    <h6>Introduction</h6>
                                    <p>1.1. Little Money Technologies Private Limited recognizes the importance of protecting your privacy and is committed to maintain the confidentiality, integrity and security of all information of our users. This Privacy Policy describes how Little Money collects and handles certain information that it may collect and/or receive from you via the use of its domain name littlemoneyindia.com, and its related sub-domains, sites, services, tools and/or its associated mobile applications (collectively, the "Platform") owned, managed and operated by Little Money Technologies Private Limited, a private company incorporated under the Companies Act, 2013 with its corporate office at #30/1, 4th Cross Road, New Bank colony, Konanakunte, Bangalore, Bangalore, Karnataka, India, 560062 (hereinafter referred to as "we", "our" or "LittleMoney" which expression shall, unless it be repugnant to the context or meaning thereof, be deemed to include its successors, affiliates, and permitted assigns) and by "you" we refer to the users of the Platform.
                                    </p>
                                    <p>1.2. The Platform is an online portal run by LittleMoney, who, as set forth above is committed to respecting your online privacy and recognizes your need for appropriate protection and management of any information you share with LittleMoney on the Platform.</p>
                                    <p>1.3. This privacy policy ("Policy") is being framed in view of the Information Technology Act, 2000 read with Regulation 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and Regulation 3(1) of the Information Technology (Intermediaries Guidelines and Digital Media Ethics Code) Rules, 2021.</p>
                                    <p>1.4. By accepting this Policy, you understand and agree to the collection, use, sharing and processing of Information, as described herein. If you provide LittleMoney with Personal Information about someone else, you confirm that such person is aware and has consented to the sharing and use of such information by LittleMoney in accordance with the terms of this Policy. This Policy applies to all the current and former visitors, users and others who access the Platform.</p>
                                    <p>1.5. If you are unwilling or unable to be legally bound by this Policy, please do not use the Platform. You cannot accept this Policy if: (a) you are not lawfully entitled to use the Platform or (b) if you are not of legal age to form a binding agreement with LittleMoney. Upon you accepting this terms and conditions and utilizing the platform of LittleMoney, you have assured to LittleMoney that you are an adult having full legal competence to enter into this binding agreement.</p>
                                    <h6>Scope</h6>
                                    <p>2.1. This Policy is an electronic record in the form of an electronic contract formed under the applicable law. This Policy does not require any physical, electronic or digital signature. This Policy is a legally binding document between you and LittleMoney. By clicking this box you assure that you have read these terms and conditions and understood it clearly. A mere click of the box would signify your consent to the terms and conditions herein.
                                    </p>
                                    <p>2.2. By accessing or using the Platform and/or availing the services provided through the Platform or otherwise giving LittleMoney your information, you undertake that you have the capacity to enter into a legally binding contract vide this Policy, which constitutes a legally binding document between you and LittleMoney under applicable law, in particular, the Indian Contract Act, 1872. LittleMoney collects and processes your usage data, personal data and third-party data carefully, only for the purposes described in this Policy and only to the extent necessary as defined herein and within the scope of applicable legal regulations. This Policy seeks to ensure that any Personal Information or third-party information handled by LittleMoney is managed in a way that is ethical, compliant and adheres to best industry practices.</p>

                                    <p>2.3. Please read the terms and conditions of this Policy carefully, before accessing or using this Platform. By accessing or using the Platform including its services, you agree to the terms of this Policy. If you are accepting this Policy on behalf of another person or company or other legal entity, you represent and warrant that you have full authority to bind such person, company or legal entity to these terms.</p>
                                    <p>2.4. This Policy describes the types of information LittleMoney collects, why and how LittleMoney uses the information, with whom LittleMoney shares it, and the choices you can make about LittleMoney' use of the information. LittleMoney also describes the measures LittleMoney takes to protect the security of the information and how you can contact LittleMoney about its privacy practices.</p>
                                    <p>2.5. This Policy describes LittleMoney current data protection policies and practices and may be amended/updated from time to time. Any changes to this Policy will become effective upon posting of the revised Policy on the Platform. It is recommended that you regularly check and review this Policy to apprise yourself of any updates. Your continued use of Platform or provision of data or information thereafter will imply your unconditional acceptance of such updates to this Policy.</p>


                                    <h6>Consent</h6>
                                    <p className="mb--20">3.1. By mere use of the Platform, you expressly consent to LittleMoney' use and disclosure of your usage information, Personal Information (as defined below) and third-party information in accordance with this Policy. If you do not agree with the terms of this Policy, please do not use this Platform. This Policy shall be deemed to be incorporated into the Terms & Conditions of the Platform ("<strong>LittleMoney Terms of Service</strong> ") and shall be read in addition to the LittleMoney Terms of Service..</p>
                                    <p>3.2. You can enjoy the Platform without providing LittleMoney (a) any of your Personal Information, or (b) in certain specific cases identified in this Policy, your consent for the purpose of processing your Personal Information. Please be aware that where you do not provide your Personal Information which is required by LittleMoney, LittleMoney will not be able to provide the services available on the Platform to you or may not be able to comply with a legal obligation on LittleMoney. You will be made aware if this situation arises and what the consequences of not providing the Personal Information will be.</p>
                                    <p>3.3. In case you wish to avail any or all of the services provided by LittleMoney on the Platform, you shall be required to log-in on the Platform with your Login Credentials as set out in the LittleMoney Terms of Service. You hereby explicitly agree that your use and access of the Login Credentials shall be governed by the LittleMoney Terms of Service read with the terms of this Policy and any other agreement that you may enter into with LittleMoney.</p>
                                    <p>3.4. By consenting to the terms of our Privacy Policy, you acknowledge and agree that LittleMoney may, after your explicit agreement to view eligible offers, automatically submit your provided information to associated lenders to pre-qualify you as an applicant. This process may result in you receiving solicitations or offers from lenders for which you are pre-qualified. Please note that our role is solely as an intermediary and we do not influence or control the offers or solicitations you may receive from these lenders.</p>
                                    <p>3.5. In addition to any consent you may give pursuant to the Privacy Policy, you hereby consent to (a) Lenders retrieving your credit score from third party providers for the purpose of evaluating your eligibility for a Credit Facility; (b) Lenders sharing your credit score with LittleMoney; (c) LittleMoney sharing the Transaction information with its affiliates and Lenders. For the avoidance of doubt, LittleMoney does not retrieve your credit score from any source.</p>
                                    <p>3.6. I Authorize Upwards & its affiliates/ partners to obtain CIBIL report from credit information Bureaus. I have read & accept <a href="https://app.upwards.in/user-consent.html" target='_blan'> CIBIL Terms & Conditions</a></p>
                                    <p>3.7. You are deemed to have full and adequate authority/ legal competency to submit the application and relevant documents for availing the loan from Protium Finance Limited (“Protium”).</p>
                                    <p>You authorize Protium or its agents/ representatives to use the documents and personal information provided by you to conduct credit reference checks by extracting additional information from various third-party sources (including but not limited to) like credit bureaus, government agencies, banks, CERSAI etc. You authorize Protium to use the same information to conduct further checks for any additional loans in the future and ongoing review. You also authorize Protium to share the application details to other regulated entities or co-lenders at its own discretion.</p>
                                    <p>You authorize Protium for communication with you on any mode (telephone calls/ SMS/ messaging services like WhatsApp, emails etc.) with respect to revisions in terms & conditions and/ or new services/ offers from Lender. Further, any acceptance by you from the mobile number(s) and Email ID(s) provided by you will be binding in nature.

                                    </p>
                                    <p>You confirm that laws concerning the unsolicited communication referred in “National Do Not Call Registry” (the “NDNC Registry”) will not be applicable for such communication received from Protium and/or associates.</p>
                                    <p id='p1'>You confirm to have read and accepted the declaration mentioned at {" "}
                                        <a href=" https://protium.co.in/regulatory/privacy-policy/ and https://protium.co.in/regulatory/terms-and-conditions" target='_blank'>  https://protium.co.in/regulatory/privacy-policy/</a> and  <a href="https://protium.co.in/regulatory/terms-and-conditions" target='_blank'>https://protium.co.in/regulatory/terms-and-conditions</a>  and   <a href="https://protium.co.in/regulatory/terms-and-conditions" target='_blank'>https://protium.co.in/regulatory/terms-and-conditions</a> </p>

                                    <h6>Types of Information</h6>
                                    <p>4.1. During your use of the Platform, we will collect such information from you including but not limited to the below mentioned:
                                        <ol type="a">
                                            <strong><li>Personal Information</li></strong>
                                            <p>Personal Information means any information that may be used to identify an individual, including, but not limited to, the first and last names, physical address, telephone number, date of birth, age, gender, e-mail address, or any other contact information, educational qualifications, professional qualifications or skill sets, information collected through social media accounts/logins of the Users which have been linked to the Account on the Platform for the purposes of creating the same by signing-up on the Platform, information that you provide when you write directly to or contact LittleMoney (including by e-mail) or provide us over telephone or any other information that LittleMoney collects or is required to be collected from you (during your use of the Platform) as per a specific mandate of or as a requirement under any applicable law (which are now or shall hereafter be in force from time to time) and other relevant financial information. Further, LittleMoney may also require you to provide certain user verification information such as your permanent account number (" <strong>PAN</strong> "), unique identification number, copy of your driving license and passport (hereinafter referred to as " <strong>Personal Information</strong>"). LittleMoney limits the collection of Personal Information to the extent which is necessary for its intended purpose.</p>
                                            <strong><li>Business Information</li></strong>
                                            <p>Business Information means any information that may be used to identify an individual's business, including but not limited to the name and address of the entity, date of incorporation, e-mail address of the entity, contact information of the registered office, company identification number (CIN), financial information including bank account details, PAN details, names of the directors and such other information (hereinafter referred to as " <strong> Business Information</strong>").</p>
                                            <strong><li>Non-Personal Information</li></strong>
                                            <p>Non-personal Information means information that does not specifically identify an individual or business, but includes, inter alia, information from you, such as your browser type, the URL of the previous websites you visited, your Internet Service Provider (ISP), operating system, your Internet Protocol (IP) address. LittleMoney may gather any Non-Personal Information regarding how many people visit this Platform, the pages they visit, their IP address, and the type of browser they used while visiting the Platform ("hereinafter referred to as "<strong>Non-Personal Information</strong> "). LittleMoney may also collect Non-Personal Information that you voluntarily provide, such as information included in response to a questionnaire or a survey conducted by LittleMoney.</p>

                                        </ol>
                                    </p>

                                    <p>4.2 Usage Information</p>
                                    <p>Usage Information includes without limitation all data and information collected automatically through the Platform (or through the third party analytics service providers), by use and access of the Platform in the nature of system administrative data, statistical and demographical data, and operational information and data generated by or characterizing use of the Platform including without limitation Non-Personal Information, Cookies (as defined below), Platform traffic, time spent on the Platform, number of visits to the Platform and other similar information and behaviour indicating the mode and manner of use of the Platform (hereinafter referred to as the "Usage Information").</p>
                                    <p>4.3. Credit Information</p>
                                    <p>
                                        4.3.1. In addition to the Information collected herein, we will, in order to (a) enable us to assist our business partners in facilitating and delivering services to you on the Platform; (b) process your applications in terms of such services; (c) communicate with you about customized products, services and personalized promotional offers (from time to time) of LittleMoney and/or its business partners; and (d) other grant access to you on the Platform in terms of this Policy and the LittleMoney Terms of Service, obtain, source and receive your credit information from any credit rating agency established and authorized under any applicable law in force, including, but not limited to, Cibil, Equifax, Experian, Highmark ("Bureau") ("Credit Information"); for which you hereby:
                                        <ol type='a'>
                                            <br />
                                            <li>appoint LittleMoney as your authorized representative to receive your credit information from any Bureau; and</li>
                                            <br />
                                            <li>unconditionally consent to and instruct any and all such Bureau to provide my credit information to me and LittleMoney on a periodic basis as may be required and you understand that you shall have the option to opt out/unsubscribe from the Platform as specified in the Clause 10.2 herein below.</li>
                                        </ol>

                                    </p>
                                    <p>4.3.2. By accepting this Policy and the LittleMoney Terms of Service, you hereby authorize LittleMoney; to do all of the following in connection with providing you access on the Platform:
                                        <ol start={"i"}>
                                            <li>Retain a copy of your Credit Information, along with the other information you have given us access to for use in accordance with Terms & Conditions and Privacy Policy;</li>
                                            <li>Verify your identity and share with the Bureaus required Personal Information about you;</li>
                                            <li>Request and receive your credit information, and credit score from the Bureau(s), including but not limited to a copy of your consumer credit report and score, at any time for so long as you have not opted out or unsubscribed from the Platform; and</li>
                                            <li>To send you information / personalized offers via email, text, call or online display or other means of delivery in accordance with the provisions of Clause 6 of the LittleMoney Terms of Service.</li>
                                        </ol>

                                    </p>
                                    <p>4.4. Personal Information, Business Information, Non-Personal Information, Usage Information, Credit information and third-party information hereinafter shall be referred to as " <strong>Information </strong> ".</p>

                                    <h6>Collection of Information</h6>
                                    <p>5.1. LittleMoney may collect Information from you when you (i) register on the Platform or avail any services of the Platform; (ii) update or change personal details in your Account; (iii) use the Platform; (iv) participate in campaigns/surveys or respond to questionnaires published by LittleMoney on the Platform; and (v) interact with LittleMoney.</p>
                                    <p>5.2. Once you register on the Platform and sign in you are not anonymous to LittleMoney. In the event your Account at the time or during registration with LittleMoney is created using your (a) cell phone number and password; (b) email address and password; or (c) google or other social media logins (if applicable), as the case maybe, you authorize LittleMoney (including its business partners) to send texts and email alerts to you with your login details and any other service requirements, including promotional mails and SMS, even if you have registered yourself under DND or DNC or NCPR services. Your authorization shall be valid as long as your Account is not deactivated.</p>
                                    <p>5.3. You hereby acknowledge and agree that all information is provided by you to LittleMoney voluntarily.</p>
                                    <p>5.4. LittleMoney, its subsidiaries and its business partners may use Cookies to monitor the Platform usage including, without limitation, to provide useful features to simplify your experience when you return to the Platform, like remembering your login id and Information and to deliver relevant content based on your preferences, usage patterns and location.</p>
                                    <p>5.5. LittleMoney may also collect Non-Personal Information or Usage Information based on your browsing activity and in relation to your use or access to the Platform like your browser type, your Internet Protocol address, your Operating System, your prior search results etc., which may or may not be publicly accessible.</p>
                                    <p>5.6. Information collected by LittleMoney from a particular browser or device may be used with another computer or device that is linked to the browser or device on which such information was collected.</p>
                                    <p>5.7. When you access the Platform through a mobile device, you will have the option of downloading the mobile application of LittleMoney.</p>




                                    <h6>Use of Information</h6>
                                    <p>6.1. LittleMoney may use the Information you provide to (a) assist our business partners in facilitating and delivering their respective programs, and services; (b) respond to your inquiries, queries about the offering on the Platform and resolve your grievances/ issues/ problems with respect to the use of the Platform; (c) administer or otherwise carry out our obligations in relation to any agreement with our business partners; (d) send you notices, communications and recommend/offer you other products, programs or services that LittleMoney believes may be of interest to you; and (e) undertake cross-selling and other marketing or promotional activities.</p>
                                    <p>6.2. LittleMoney may use the Information to monitor your use of the LittleMoney services and may review and analyse the Information provided by you to provide you with customized service.</p>
                                    <p>6.3. LittleMoney may use the Information provided by you to improve our platform, prevent or detect fraud or abuses of our Platform and enable third parties to carry out technical, logistical or other functions on our behalf as detailed in Clause 7 (Information Sharing) below. We may combine Information we get from you with information about you we get from third parties.</p>
                                    <p>6.4. LittleMoney may use your Non-Personal Information for internal business purposes, such as data analysis, research, developing new products, enhancing and improving existing products and services and in identifying usage trends.</p>
                                    <p>6.5. Subject to and in accordance with applicable laws, LittleMoney has the right to use your Information for the purpose of conducting promotional/marketing related activities on the Platform to promote the services of LittleMoney.</p>
                                    <p>6.6. When you send an email message or otherwise contact LittleMoney through its Platform, LittleMoney may use the Information provided by you to respond to your communication. LittleMoney may also archive such Information and/or use it for future communications with you to inform you regarding updates, newsletters, offers, new services and promotions.</p>



                                    <h6>Information Sharing</h6>
                                    <p>7.1. LittleMoney maintains your Information in electronic form on its devices and on the equipment of LittleMoney' employees. The Information is made accessible to employees, agents, officers, legal advisors, auditors or business partners and other third-parties only on a "need-to-know" basis in accordance with applicable law.</p>
                                    <p>7.2. LittleMoney does not rent, sell, or share Information with other people or with other non-affiliated entities, except with your consent, to provide services you have requested for or under the following circumstances:
                                        <ol type='a'>
                                            <li>LittleMoney may engage third party service providers to perform certain support services, who may have access to Information;</li>
                                            <li>In the event LittleMoney exercises its rights reserved under the LittleMoney Terms of Service to charge any fee for registration/membership or browsing fee at any time, LittleMoney may direct you to a payment gateway service provider of its own choice, which may have access to the Personal Information provided by you while making such payment;</li>
                                            <li>LittleMoney may share your Information with government authorities in response to subpoenas, court orders, or other legal process; to establish or exercise legal rights; to defend against legal claims; or as otherwise required by law. This may be done in response to a law enforcement agency's request.</li>
                                        </ol>
                                    </p>
                                    <p>7.3. LittleMoney may disclose your personally identifiable information to companies whose practices are not covered by this Policy, (e.g., other marketers, magazine publishers, retailers, participatory databases, and non-profit organizations) that want to market products or services to you
                                    </p>
                                    <p>7.4. We limit the collection and use of your Information. We may make anonymous or aggregate Information and disclose such data only in a non-personally identifiable manner. Such information does not identify you individually. Access to your Account information and any other Information is strictly restricted and used only in accordance with specific internal procedures, and for the purposes set out in this Privacy Policy, in order to operate, develop or improve our Platform and services. We may use third party service providers to enable us to provide you with our services and we require such third parties to maintain the confidentiality of the information we provide to them under our contracts with them.</p>
                                    <p>7.5. LittleMoney may disclose and/or transfer your Personal Information to an investor, acquirer, assignee or other successor entity in connection with a sale, merger, or reorganization of all or substantially all of the equity, business or assets of LittleMoney.</p>

                                    <h6>Cookies</h6>
                                    <p>8.1. To enhance your experience with the Platform, many of the web pages use "cookies" and pixel tags that enable LittleMoney features and functionality. Cookies are text files placed in your mobile/ computer's browser to maintain your log-in and session details. LittleMoney uses three types of cookies, necessary session cookies (including username, email ID, user access information) which enables LittleMoney to recognise you and makes it easier for you to return to Platform and interact with the LittleMoney' services without signing in again, and/or preference cookies (including search and browsing history) which are stored for the maximum duration permitted by law, and/or statistics cookies (including Usage Information such as unique request ID, statistical data) which are stored for 24 (twenty four)hours or the maximum duration permitted by law (collectively referred to as the "Cookies").</p>
                                    <p>8.2. Cookies, by themselves, do not tell LittleMoney your e-mail address or other Personally Information unless you choose to provide the same to LittleMoney by, for example, registering on the Platform and/or by availing the services provided by LittleMoney. Cookies are designed to hold a marginal amount of data specific to a particular user and website and can be accessed either by the web server or the user device. However, once you choose to furnish the Platform with personally identifiable information, this information may be linked to the data stored in the Cookies. LittleMoney uses Cookies to understand site usage and to improve the content and offerings on the Platform. For example, LittleMoney may use Cookies to personalize your experience on the Platform (e.g., to recognize you by name when you return to the Platform). LittleMoney also may use Cookies to offer you products, programs, or services. Cookies may be placed on the Platform by third-parties as well, the use of which LittleMoney does not control. You are free to accept or refuse the use of Cookies via the cookie banner that appears when you open the Platform.</p>
                                    <p>8.3. Cookies are retained in your browser unless specifically deleted, depending on the type of Cookies. If you decline the Cookies, you may be unable to use certain features on the Platform and you may be required to re-enter your password frequently. By using or accessing the Platform and/or the services provided by LittleMoney, you hereby explicitly authorise LittleMoney and give your consent to LittleMoney to store, use and access Cookies for the purposes outlined in this Policy. Most browsers allow you to control Cookies through their settings, which may be adapted to reflect your consent to the use of Cookies, and they may also enable you to review and erase Cookies.</p>
                                    <p>8.4. You can manage browser Cookies through your browser settings. The 'Help' feature on most browsers will tell you how to prevent your browser from accepting new Cookies, how to have the browser notify you when you receive Cookies, how to disable Cookies, and when Cookies will expire. If you disable all Cookies on your browser, neither we nor third parties will transfer Cookies to your browser. If you do this, however, you may have to manually adjust some preferences every time you visit the Platform and some features and services may not work.</p>



                                    <h6>Third Party Service Providers and Social Media Websites</h6>
                                    <p>9.1. LittleMoney may engage third party service providers, vendors and/or contractors to perform certain support services for LittleMoney, including, without limitation, software maintenance services, advertising and marketing services, web hosting services and such other related services which are required by LittleMoney to provide its services efficiently. These third parties may have limited access to the Information. If they do, this limited access is provided so that they may perform these tasks for LittleMoney and they are not authorized by LittleMoney to otherwise use or disclose Information, except to the extent required by law. We may use third-party service providers to serve ads on our behalf across the internet and sometimes on this Platform. They may collect anonymous information about your visits to this Platform, and your interaction with our products and services. They may also use information about your visits to this Platform and other websites for targeted advertisements for goods and services. LittleMoney does not make any representations concerning the privacy practices or policies or Terms & Conditions of such websites, nor does it control or guarantee the accuracy, integrity, or quality of the information, data, text, software, music, sound, photographs, graphics, videos, messages or other materials available on such websites. The inclusion or exclusion does not imply any endorsement by LittleMoney of the website, the website's provider, or the information on such website.</p>
                                    <p>9.2. The Platform may contain links and interactive functionality interacting with the websites of third parties. LittleMoney is not responsible for and has no liability for the functionality, actions, inactions, privacy settings, privacy policies, terms, or content of any such website. Personal Information that you provide to those websites are not our property. Before enabling any sharing functions to communicate with any such website or otherwise visiting any such website, LittleMoney strongly recommends that you review and understand the terms and conditions, privacy policies, settings, and information-sharing functions of each such third-party website.</p>


                                    <h6>Control Over Your Personal Information</h6>
                                    <p>10.1. It is important to note that the Information we use about you helps us provide you with products, services and experiences that benefit you. You have the ability to control how your Non-Personal information is collected and used online. You also have the ability to choose what Personal Information you provide to us. However, if you choose not to provide all of the Information and data that is requested of you, we may not be able to provide you with the services/products that you have registered for through the creation of an Account on the Platform.</p>
                                    <p>10.2. Where the legal basis for LittleMoney processing your Personal Information is that you have provided your consent, you have the right, at any time, to withdraw your consent at any point, provided such withdrawal of the consent is intimated to LittleMoney in writing through an email at <a href="mailto: support@littlemoney.co.in"> support@littlemoney.co.in</a>, requesting the same. If you at any time wish to rectify your Personal Information, you may write to LittleMoney as per Clause 11 of this Policy. Once you withdraw your consent to share the Personal Information collected by LittleMoney, LittleMoney shall have the option not to fulfil the purposes for which the said Personal Information was sought and LittleMoney may restrict you from using the services on the Platform and/or the Platform itself.</p>


                                    <h6>Rectification/Correction of Personal Information</h6>
                                    <p>11.1. You shall have the right to review your Personal Information submitted by you on the Platform and to modify or delete any Personal Information provided by you directly on the Platform. You hereby understand that any such modification or deletion may affect your ability to use the Platform. Further, it may affect LittleMoney' ability to provide its services to you.</p>
                                    <p>11.2. LittleMoney reserves the right to verify and authenticate your identity and your Account Information and/or payment Information in order to ensure accurate delivery of services. Access to or correction, updating or deletion of your Personal Information may be denied or limited by LittleMoney, if it would violate another person's rights and/or is not otherwise permitted by applicable law.</p>
                                    <p>11.3. If you need to update or correct your Personal Information that LittleMoney may have collected to offer you personalized services and offers, you may send updates and corrections to LittleMoney at <a href="mailto: support@littlemoney.co.in"> support@littlemoney.co.in</a>, citing the reason for such rectification of Personal Information. LittleMoney will take all reasonable efforts to incorporate the changes within a reasonable period of time.</p>


                                    <h6>Term of Storage of Personal Information</h6>
                                    <p>12.1. LittleMoney shall store your Personal Information at least for such period as may be required and permitted by applicable law. These periods vary depending on the nature of the information and your interactions with LittleMoney.</p>
                                    <p>12.2. You agree that you will not submit any false information or any illegal or damaging content to the Platform. LittleMoney reserves the right to terminate access to or the ability to interact with the Platform in response to any concerns LittleMoney may have about false, illegal, or damaging content, or for any other reason, in its sole discretion.</p>


                                    <h6>Protection of Information</h6>
                                    <p>13.1. LittleMoney has taken adequate measures to protect the security of Information and to ensure that your choices for its intended use are honoured. LittleMoney takes robust precautions to protect your data from loss, misuse, unauthorized access or disclosure, alteration, or destruction.</p>
                                    <p>13.2. LittleMoney considers the confidentiality and security of your Information to be of utmost importance and understands the integrity and availability of your Information is vital to our own success. It therefore uses industry standards, and physical, technical, organization and administrative security measures to keep information confidential and secure and LittleMoney will not share your information with third parties, except as otherwise provided in this Policy. Please be advised, however, that while LittleMoney strives to protect Information and privacy, no method of transmission over the Internet, or method of electronic storage, is 100% secure and LittleMoney cannot guarantee or warranty its absolute security when Information is transmitted over the internet into the Platform.</p>
                                    <p>13.3. Access to your online Account on the Platform is via Login Credentials, which is password protected and this helps to secure your Account information. You are solely responsible for maintaining the security and confidentiality of your Account, including the Login Credentials. To ensure safety of your Personal Information, you are advised against sharing your Login Credentials with anyone. If you suspect any unauthorized use of your Account, you must immediately notify LittleMoney by sending an email to <a href="mailto: support@littlemoney.co.in"> support@littlemoney.co.in</a> You shall be liable to indemnify LittleMoney for any loss suffered by LittleMoney due to such unauthorized use of your Account.</p>
                                    <p>13.4. For any loss or theft of Information, due to unauthorized access to your device through which you use the Platform or other reasons solely attributable to you, LittleMoney shall not be held liable or responsible under any circumstance whatsoever. Further, LittleMoney shall not be responsible for any breach of security or for any actions of any third parties or events that are beyond LittleMoney' reasonable control including but not limited to acts of government, computer hacking, unauthorised access to computer data and storage device, computer crashes, breach of security and encryption, poor quality of Internet service or telephone service of the user, etc.</p>


                                    <h6>Minor</h6>
                                    <p>LittleMoney does not intend to attract anyone under the legal age of consent to enter into binding legal contracts under the laws of their respective jurisdictions. LittleMoney does not intentionally or knowingly collect Personal Information through the Platform from anyone under that age. LittleMoney encourages parents and guardians to be involved in the online activities of minors to ensure that no Personal Information is collected from a minor without their prior consent. If you are using the Platform on behalf of someone else, including but not limited to, on behalf of your minor child/children or employer, you represent and warrant that you are authorised by such person to accept this Policy on their behalf and to provide consent on behalf of such person to LittleMoney' use of such person's Personal Information as described in this Policy.</p>


                                    <h6>Limitation of Liability</h6>
                                    <p>15.1. LittleMoney shall not be liable to you for any loss of profit, production, anticipated savings, goodwill or business opportunities or any type of direct or indirect, incidental, economic, compensatory, punitive, exemplary or consequential losses arising out of performance or non-performance of its obligations under this Policy.</p>
                                    <p>15.2. Notwithstanding anything contained in this Policy or elsewhere, LittleMoney shall not be held responsible for any loss, damage or misuse of your Personal Information, if such loss, damage or misuse is attributable to a Force Majeure Event. The term "Force Majeure Event" shall mean any event that is beyond the reasonable control of LittleMoney and shall include, without limitation, sabotage, fire, flood, explosion, acts of God, civil commotion, strikes, lockouts or industrial action of any kind, riots, insurrection, war, acts of government, pandemic, epidemic, computer hacking, civil disturbances, unauthorised access to computer data and storage device, computer crashes, breach of security and encryption, epidemic, pandemic or national/state lockdown due to any reason and any other similar events not within the control of LittleMoney and which LittleMoney is not able to overcome.</p>


                                    <h6>Applicability of the LittleMoney Terms of Service</h6>
                                    <p>This Policy shall be supplementary to the LittleMoney Terms of Service. Words and expressions used in this Policy but not defined herein shall have the meanings ascribed to them in the LittleMoney Terms of Service. To the extent any provision of this Policy does not conflict with the LittleMoney Terms of Service, the LittleMoney Terms of Service shall apply to this Policy. In the event of any conflict between this Policy and the LittleMoney Terms of Service, the interpretation placed by LittleMoney shall be final and binding on you.</p>


                                    <h6>Grievance Officer</h6>
                                    <strong><p>17.1. LittleMoney Grievance Officer</p></strong>
                                    <p>In accordance with the provisions of Information Technology Act, 2000 and Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011, the name and contact details of the Grievance Officer are provided below:</p>
                                    <p>Name: Gajendra Sangappa</p>
                                    <p>Address: #30/1, 4th Cross Road, New Bank colony, Konanakunte, Bangalore, Bangalore, Karnataka, India, 560062</p>
                                    <p>Cell: +91- 9513993655</p>
                                    <p>Email ID: <a href="mailto: support@littlemoney.co.in"> support@littlemoney.co.in</a></p>
                                    <p>If you wish to make a complaint regarding any violation of the provisions of this Policy, you may send a written complaint to the Grievance Officer, who shall redress the complaint in accordance with the provisions of the Information Technology Act, 2000 and Rules made thereunder.</p>
                                    <strong><p>17.2. InCred Financial Services Limited Grievance Officer</p></strong>
                                    <ol type='a'>
                                        <p><li>How to log in a complain/where can a complain be made</li></p>
                                        <p>Any customer having a grievance/complaint/feedback with respect to the products and services offered by InCred Financial Services Limited may write the Company’s Customer Service Department through any of the following channels:</p>
                                        <p>Call: 1-800-102-2192</p>
                                        <p>Email: care@incred.com</p>
                                        <p>Website:
                                            <ul>
                                                <li><a href="https://www.incred.com/" target='_blank'>www.incred.com</a></li>
                                                <li><a href="https://www.incred.com/partnership/" target='_blank'>www.incred.com/home/partnership/</a></li>
                                                <li><a href="https://www.incred.com/grievance-bee-secure/" target='_blank'>www.incred.com/grievance-bee-secure.html</a></li>
                                            </ul>
                                        </p>
                                        <p><li>Whom to approach for redressal</li></p>
                                        <p>Customers are requested to first raise their concerns through any of the channels mentioned above. And if the same is not resolved within 5 days or if the customer is not satisfied with the solution provided by the customer care service, then the customer may follow below escalations for resolving their grievances,</p>
                                        <p>Name: Ms. Rosy Dsouza</p>
                                        <p>Contact: 022-42117799</p>
                                        <p>Email Id: care@incred.com</p>
                                        <p>In case the complaint is not resolved within a period of five days or if the customer is not satisfied with the solution provided by Mr. Kiran Gawand then the customer may approach the Grievance Redressal Officer. The name and contact details of the Grievance Redressal Officer is as follows:</p>
                                        <p>Grievance Redressal Officer Name: Mr. Vaidyanathan Ramamoorthy</p>
                                        <p>E-mail ID: incred.grievance@incred.com</p>
                                        <p>ETelephone no.: 022-42117799</p>
                                        <p>Address: Incred Financial Services Limited, 1203, 12th Floor, B Wing, The Capital, Bandra Kurla Complex, Mumbai - 400 051</p>
                                        <a href="https://www.incred.com/grievance.html" target='_blank'>https://www.incred.com/grievance.html</a>
                                        <br /> <br />
                                        <p><li>Details of InCred Personal Loan:</li></p>
                                        <br />
                                        <p>Details of InCred Personal loans can be found at https://personal-loans.incred.com/personal-loan</p>
                                        <p>RBI Sachet Portal: <a href="https://sachet.rbi.org.in/" target='_blank'>https://sachet.rbi.org.in/</a></p>

                                        <strong><p>17.3. Fibe</p></strong>
                                        <p><strong>Grievance Redressal Officer: </strong>  Mr. Amit Nosina</p>
                                        <p><strong>Company name: </strong> EarlySalary Services Private Limited</p>
                                        <p><strong>Tel:</strong>020-67639797</p>
                                        <p><strong>Email: </strong><a href="mailto:grievance@earlysalary.com" target='_blank'>grievance@earlysalary.com</a></p>
                                        <p><strong>
                                            Customer Care:
                                        </strong></p>
                                        <p>Mail to <a href="mailto:care@earlysalary.com">care@earlysalary.com</a> or call at 020-67639797</p>
                                        <p> <a href="www.earlysalary.in">www.earlysalary.in</a> </p>
                                        <p>17.4. Prefr</p>
                                        <p>The GRO details are part of the same link under the - Grievance Redressal <a href="https://prefr.com/privacy_policy" target='_blank'>https://prefr.com/privacy_policy</a></p>
                                        <p>Ram Fincorp</p>
                                        <p><a href="https://www.ramfincorp.com/privacypolicy" target='_blank'>https://www.ramfincorp.com/privacypolicy</a></p>
                                        <p><a href="https://www.ramfincorp.com/grievance_redressal_policy" target='_blank'>https://www.ramfincorp.com/grievance_redressal_policy</a></p>
                                        <p><a href="https://www.ramfincorp.com/grievance-redressal" target='_blank'>https://www.ramfincorp.com/grievance-redressal</a></p>
                                        <p>17.5. Lendingkart</p>
                                        <p>Grievance Redressal Officer:</p>
                                        <p>Ms.Ajitha K</p>
                                        <p><a href="mailto:grievance.redressal@lendingkart.com">Email ID: grievance.redressal@lendingkart.com</a></p>
                                        <p>Phone no: +91 6358874622</p>
                                        <p><a href="www.lendinkart.com" target='_blank'>www.lendinkart.com</a></p>
                                        <p>17.6 FlexiLoans</p>
                                        <p><a href="https://flexiloans.com/grievance-redressal-mechanism" target='_blank'>Grievance Redressal Officer</a></p>
                                        <p><a href="https://flexiloans.com/regulatory#ui-id-1" target='_blank'>Privacy Policy</a></p>
                                        <p><a href="https://flexiloans.com/" target='_blank'>Product Details</a></p>
                                    </ol>
                                    <h6>How to Contact Us</h6>
                                    <p>If you have questions or concerns about this Policy, please contact LittleMoney at the following email address: <a href="mailto:admin@littlemoney.co.in"> admin@littlemoney.co.in</a>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <CtaLayoutOne /> */}
                <FooterOne parentClass="" />
            </main>
        </>
    )
}

export default PrivacyPolicy;