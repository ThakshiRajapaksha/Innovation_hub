"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="bg-white-800 p-5 fixed top-0 left-0 right-0 z-50 w-full">
      <nav>
        <ul className="flex items-center space-x-8 w-full">
          {/* Back Button with Symbol */}
          <li>
            <Button
              variant="link"
              onClick={() => router.back()}
              className="text-2xl hover:text-gray-400 transition-colors"
            >
              ←
            </Button>
          </li>
          <li>
            <Button variant="link" onClick={() => router.push("/")}>
              Home
            </Button>
          </li>
          <li>
            <Button variant="link" onClick={() => router.push("/about")}>
              About
            </Button>
          </li>
          <li>
            <Button variant="link" onClick={() => router.push("/services")}>
              Services
            </Button>
          </li>
          <li>
            <Button variant="link" onClick={() => router.push("/contact")}>
              Contact
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Terms = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "si" : "en");
  };

  return (
    <div className="bg-gray-900 text-white">
      <Navbar /> {/* Display the navbar */}
      <div className="mt-24 p-6 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold">
          {language === "en"
            ? "Terms and Conditions for Idea Submission and Intellectual Property Protection"
            : "අදහස් ඉදිරිපත් කිරීම සහ බුද්ධිමය දේපළ ආරක්ෂාව සඳහා නියමයන් සහ කොන්දේසි"}
        </h1>
        <Button
          variant="outline"
          onClick={toggleLanguage}
          className="mt-4 mb-6 px-6 py-2  text-black"
        >
          {language === "en" ? "සිංහලට පරිවර්තනය" : "Translate to English"}
        </Button>

        {language === "en" ? (
          <>
            <h2 className="mt-6 text-2xl font-semibold">1. Introduction</h2>
            <p className="mt-2">
              Welcome to Innovation HUB. This platform enables students to
              present their innovations (ideas) and allows industry experts and
              investors to view these ideas.
            </p>

            <h2 className="mt-6 text-2xl font-semibold">
              2. Ownership of Ideas
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                All ideas submitted on the platform remain the personal
                intellectual property (IP) of the students who present them.
              </li>
              <li>
                The platform does not claim ownership of the ideas and only
                facilitates their promotion.
              </li>
              <li>
                Users are responsible for ensuring the confidentiality and
                ownership of their ideas.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              3. Confidentiality and Public Disclosure
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                Ideas submitted on the platform can be viewed by investors and
                industry experts and discussed with them if necessary.
              </li>
              <li>The platform does not guarantee complete confidentiality.</li>
              <li>
                Users are advised not to disclose highly sensitive information
                or technical details.
              </li>
              <li>
                Before submission, users should consider patenting,
                trademarking, or registering their intellectual property where
                applicable.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              4. Use by Industry Experts and Investors
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                Industry experts and investors are granted access only to
                explore ideas and opportunities.
              </li>
              <li>
                They cannot copy, use, or implement ideas without legal
                permission.
              </li>
              <li>
                Communication between students and investors must be conducted
                exclusively through the platform’s designated communication
                channel (Chat Option).
              </li>
              <li>
                If users share their ideas through external communication
                channels, the platform does not assume any responsibility.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              5. Intellectual Property Protection
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                Users should seek legal advice on patents, copyrights, or
                trademarks for their ideas through our platform. If not, we do
                not take responsibility for the protection of their ideas.
              </li>
              <li>
                A timestamping service is provided to automatically record
                submission dates and details.
              </li>
              <li>
                Users should limit their submissions to basic concepts and avoid
                disclosing highly sensitive details.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              6. Disclaimer of Liability
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                The platform only facilitates opportunities and does not
                guarantee the protection of submitted ideas.
              </li>
              <li>
                If investors or other parties misuse an idea, the platform is
                not liable.
              </li>
              <li>
                Users must acknowledge the risks associated with submitting
                their ideas and use the platform accordingly.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              7. Reporting Intellectual Property Violations
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                If a user believes their idea has been illegally used, they may
                report it to the platform.
              </li>
              <li>
                Users are responsible for taking legal action if necessary, but
                the platform can provide support.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              8. Amendments to Terms and Conditions
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>These terms will be updated periodically as needed.</li>
              <li>Users will be notified of any changes.</li>
            </ul>
          </>
        ) : (
          <>
            <h2 className="mt-6 text-2xl font-semibold">1. හැඳින්වීම</h2>
            <p className="mt-2">
              Innovation HUB වෙත ඔබ සාදරයෙන් පිළිගනිමු. මෙම වේදිකාව ශිෂ්‍යයන්ට
              ඔවුන්ගේ නව නිපැයුම් (අදහස්) ඉදිරිපත් කිරීමට සහ කර්මාන්ත විශේෂඥයින්
              සහ ආයෝජකයින්ට එම අදහස් දැක්වීමට හැකියාව ලබාදේ.
            </p>

            <h2 className="mt-6 text-2xl font-semibold">2. අදහස් හිමිකම</h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                වේදිකාවේ ඉදිරිපත් කරන සියලුම අදහස් ඒවා ඉදිරිපත් කළ ශිෂ්‍යයන්ගේ
                පුද්ගලික බුද්ධිමය දේපළ (IP) ලෙස පවතී.
              </li>
              <li>
                වේදිකාව අදහස් පිළිබඳ හිමිකාරියාව නොදරන අතර, එම අදහස් ප්‍රචාරය
                කිරීම සඳහා පමණක් භාවිත කරයි.
              </li>
              <li>
                පරිශීලකයන් තම අදහස් අනන්‍යතාවය හා අයිතිය ආරක්ෂා කිරීමට වග බලාගත
                යුතුය.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              3. රහස්‍යභාවය සහ පොදු ප්‍රචාරණය
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                වේදිකාවේ ඉදිරිපත් කරන අදහස්, ආයෝජකයින් සහ කර්මාන්ත විශේෂඥයින්ට
                දැක්විය හැකි අතර, අවශ්‍ය නම් ඔවුන් සමඟ සාකච්ඡා කළ හැක.
              </li>
              <li>වේදිකාව සම්පූර්ණ රහස්‍යභාවයක් සහතික නොකරයි.</li>
              <li>
                අතිශය වැදගත් තොරතුරු හෝ තාක්ෂණික විස්තර හෙළිදරව් නොකරන ලෙස
                පරිශීලකයින්ට උපදෙස් දිය යුතුය.
              </li>
              <li>
                ඉදිරිපත් කරන අදහස්, පෙර නිවැරදිව පේටන්ට්, ට්‍රේඩ්මාර්ක් හෝ මුල්
                හිමිකම් ලියාපදිංචි කිරීම සලකා බැලිය යුතුය.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              4. කර්මාන්ත විශේෂඥයින් සහ ආයෝජකයින් විසින් භාවිතය
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                අදහස් බලාපොරොත්තු සහ අවස්ථා සොයා බැලීම සඳහා පමණක් කර්මාන්ත
                විශේෂඥයින් සහ ආයෝජකයින්ට ප්‍රවේශය ලබාදේ.
              </li>
              <li>
                ඔවුන් නීතිමය අවසරයකින් තොරව අදහස් පිටපත් කිරීමට, භාවිතයට ගැනීමට
                හෝ ක්‍රියාත්මක කිරීමට නොහැක.
              </li>
              <li>
                ශිෂ්‍යයන් හා ආයෝජකයින් අතර සබඳතාවය සඳහා, වේදිකාවේ විශේෂිත
                සන්නිවේදන නාලිකාව පමණක් (Chat Option) භාවිත කළ යුතුය.
              </li>
              <li>
                වෙන සන්නිවේදන නාලිකාවක් හරහා ඔබ අදහස් බෙදාගන්න විටදී, වේදිකාව
                කිසිම වගකීමක් නොගනී.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              5. බුද්ධිමය දේපළ ආරක්ෂාව
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                පරිශීලකයින් තම අදහස් සඳහා පේටන්ට්, මෘදුකාංග අයිතිය (copyrights)
                හෝ ට්‍රේඩ්මාර්ක් ලියාපදිංචි කිරීම සම්බන්ධයෙන් නීතිමය උපදෙස් ලබා
                ගැනීම අප හරහා කළ යුතුය. එසේ නොකරන්නේ නම්, ඔබගේ අදහස් ආරක්ෂා
                කිරීම පිළිබඳ වගකීමක් අප විසින් ගනු නොලැබේ.
              </li>
              <li>
                අදහස් ඉදිරිපත් කිරීමේ දිනය සහ තොරතුරු ස්වයංක්‍රීයව වාර්තා කිරීම
                (timestamping) සේවාවක් ලෙස ලබාදෙයි.
              </li>
              <li>
                විශේෂයෙන්, අතිශය සංවේදන තොරතුරු හෙළිදරව් නොකර, මූලික අදහස්
                ඉදිරිපත් කිරීමට පමණක් සීමා වන්න.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">6. වගකීම් ඉවතලීම</h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                වේදිකාව අවස්ථා සපයන පමණක් වන අතර, අදහස් ආරක්ෂා කිරීමේ වගකීම්
                ඉවතලයි.
              </li>
              <li>
                ආයෝජකයින් හෝ වෙනත් පාර්ශවයන් විසින් අදහස් අනිසි ලෙස භාවිතා
                කළහොත්, වේදිකාව එයට වගකිව යුතු නොවේ.
              </li>
              <li>
                පරිශීලකයින් තම අදහස් ඉදිරිපත් කිරීමේදී ඇති විය හැකි අවදානම්
                පිළිගෙන එම සන්ධානය භාවිත කළ යුතුය.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              7. බුද්ධිමය දේපළ උල්ලංගනයක් වාර්තා කිරීම
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                පරිශීලකයෙකු තම අදහස අනතුරුව නොනිතික ලෙස භාවිතා කළ බව විශ්වාස
                කළහොත්, ඔවුන්ට එය වේදිකාවට වාර්තා කිරීමට හැකි වේ.
              </li>
              <li>
                පරිශීලකයන් නීතිමය පියවර ගෙන ගොන්නට වගකීව, නමුත් වේදිකාව සහාය ලබා
                දිය හැක.
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">
              8. නියමයන් සහ කොන්දේසි වෙනස් කිරීම
            </h2>
            <ul className="mt-2 list-disc pl-5">
              <li>මෙම නියමයන් සහ කොන්දේසි අවශ්‍ය අනුව සමාවෙයි.</li>
              <li>වෙනස්කම් පරිශීලකයන්ට දැනුම් දෙනු ලැබේ.</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Terms;
