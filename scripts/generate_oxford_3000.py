import urllib.request
import json
import csv
import io
import re
import os

print("Starting Oxford 3000 compilation...")

# 1. Fetch Oxford 3000
u_oxford = 'https://raw.githubusercontent.com/winterdl/oxford-5000-vocabulary-audio-definition/master/data/oxford_3000.json'
req_o = urllib.request.Request(u_oxford, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req_o) as r:
    oxford_raw = json.loads(r.read().decode('utf-8'))

print(f"Loaded {len(oxford_raw)} raw entries from Oxford 3000.")

# 2. Fetch Bengali Dictionary (MinhasKamal)
u_36 = 'https://raw.githubusercontent.com/MinhasKamal/BengaliDictionary/master/BengaliDictionary_36.csv'
req_36 = urllib.request.Request(u_36, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req_36) as r:
    data_36 = r.read().decode('utf-8-sig', errors='ignore')

reader = csv.reader(io.StringIO(data_36))
dict_36 = {}
for row in reader:
    if row and len(row) >= 2:
        en = row[0].strip().lower()
        bn = row[1].strip()
        if en and bn and en not in dict_36:
            dict_36[en] = bn

# Extra modern dictionary mappings for common/compound words
SPECIAL_MAP = {
    'absolutely': 'একদম / সম্পূর্ণভাবে',
    'acceptable': 'গ্রহণযোগ্য',
    'according to': 'অনুসারে / মতে',
    'achievement': 'অর্জন / সাফল্য',
    'actually': 'প্রকৃতপক্ষে / আসলে',
    'advertisement': 'বিজ্ঞাপন',
    'aircraft': 'উড়োজাহাজ / বিমান',
    'airline': 'বিমানসংস্থা',
    'all right': 'ঠিক আছে / ভালো',
    'announcement': 'ঘোষণা',
    'any more': 'আর কোনো / আরও',
    'app': 'মোবাইল অ্যাপ / অ্যাপ্লিকেশন',
    'assessment': 'মূল্যায়ন',
    'assignment': 'অ্যাসাইনমেন্ট / নির্ধারিত কাজ',
    'assistant': 'সহকারী',
    'background': 'পটভূমি / পেছনের দিক',
    'badly': 'খারাপভাবে / ভীষণভাবে',
    'basically': 'মূলত / সাধারণভাবে',
    'basketball': 'বাস্কেটবল খেলা',
    'bathroom': 'গোসলখানা / বাথরুম',
    'bedroom': 'শোবার ঘর',
    'birthday': 'জন্মদিন',
    'blog': 'ব্লগ / অনলাইন ডায়েরি',
    'boyfriend': 'প্রেমিক / পুরুষ বন্ধু',
    'businessman': 'ব্যবসায়ী',
    'cafe': 'ক্যাফে / কফি শপ',
    'certainly': 'অবশ্যই / নিশ্চিতভাবে',
    'chairman': 'সভাপতি / চেয়ারম্যান',
    'characteristic': 'বৈশিষ্ট্য',
    'childhood': 'শৈশব / ছোটবেলা',
    'classroom': 'শ্রেণিকক্ষ',
    'coloured': 'রঙিন',
    'commitment': 'প্রতিশ্রুতি / দায়বদ্ধতা',
    'cooking': 'রান্না করা / রন্ধনশিল্প',
    'correctly': 'সঠিকভাবে / নির্ভুলভাবে',
    'currently': 'বর্তমানে / এই মুহূর্তে',
    'dancing': 'নাচ / নৃত্য',
    'difficult': 'কঠিন / জটিল',
    'difficulty': 'অসুবিধা / সমস্যা',
    'digital': 'ডিজিটাল',
    'download': 'ডাউনলোড করা',
    'dvd': 'ডিভিডি ডিস্ক',
    'educational': 'শিক্ষামূলক',
    'effectively': 'কার্যকরভাবে',
    'eighteen': 'আঠারো',
    'eighty': 'আশি',
    'electronic': 'বৈদ্যুতিন / ইলেকট্রনিক',
    'email': 'ইমেইল / বার্তা',
    'embarrassing': 'লজ্জাজনক / বিব্রতকর',
    'emotional': 'আবেগপূর্ণ / সংবেদনশীল',
    'employee': 'কর্মচারী / কর্মী',
    'entertainment': 'বিনোদন',
    'entirely': 'সম্পূর্ণরূপে',
    'environmental': 'পরিবেশগত',
    'equipment': 'সরঞ্জাম / উপকরণ',
    'especially': 'বিশেষ করে',
    'euro': 'ইউরো (মুদ্রা)',
    'eventually': 'অবশেষে / ফলস্বরূপ',
    'everybody': 'সবাই / প্রত্যেকে',
    'everyday': 'প্রতিদিনের / দৈনন্দিন',
    'everyone': 'প্রত্যেকে / সবাই',
    'everything': 'সবকিছু',
    'everywhere': 'সর্বত্র / সব জায়গায়',
    'exactly': 'ঠিক তাই / হুবহু',
    'existence': 'অস্তিত্ব',
    'exploration': 'অনুসন্ধান / গবেষণা',
    'farmer': 'কৃষক',
    'feedback': 'মতামত / প্রতিক্রিয়া',
    'finally': 'অবশেষে',
    'firstly': 'প্রথমত',
    'fitness': 'শারীরিক সুস্থতা / ফিটনেস',
    'folding': 'ভাঁজযোগ্য',
    'football': 'ফুটবল খেলা',
    'fourteen': 'চৌদ্দ',
    'frequently': 'ঘন ঘন / বারবার',
    'fully': 'পুরোপুরি / সম্পূর্ণ',
    'funding': 'তহবিল / অর্থায়ন',
    'furthermore': 'তাছাড়া / অধিকন্তু',
    'girlfriend': 'প্রেমিকা / বান্ধবী',
    'grandparent': 'দাদা-দাদি / নানা-নানি',
    'guilty': 'দোষী / অপরাধী',
    'harmful': 'ক্ষতিকর',
    'have to': 'করতে হবে / বাধ্য হওয়া',
    'headache': 'মাথাব্যথা',
    'headline': 'শিরোনাম',
    'heating': 'উত্তাপ / গরম করার ব্যবস্থা',
    'helpful': 'সহায়ক / উপকারী',
    'highlight': 'হাইলাইট করা / গুরুত্ব দেওয়া',
    'homework': 'বাড়ির কাজ / হোমওয়ার্ক',
    'household': 'গৃহস্থালি',
    'however': 'যাইহোক / তবে',
    'immediately': 'অবিলম্বে / সাথে সাথে',
    'importance': 'গুরুত্ব',
    'improvement': 'উন্নতি / অগ্রগতি',
    'incredibly': 'অবিশ্বাস্যভাবে',
    'initially': 'প্রাথমিকভাবে / শুরুতে',
    'instructor': 'প্রশিক্ষক / শিক্ষক',
    'intelligent': 'বুদ্ধিমান / মেধাবী',
    'internet': 'ইন্টারনেট',
    'invest': 'বিনিয়োগ করা',
    'jewellery': 'গহনা / অলংকার',
    'journalist': 'সাংবাদিক',
    'keyboard': 'কীবোর্ড',
    'kilometre': 'কিলোমিটার',
    'laptop': 'ল্যাপটপ কম্পিউটার',
    'largely': 'মূলত / প্রধানত',
    'latest': 'সর্বশেষ / সাম্প্রতিকতম',
    'leadership': 'নেতৃত্ব',
    'lifestyle': 'জীবনযাত্রা / লাইফস্টাইল',
    'location': 'অবস্থান / স্থান',
    'logical': 'যৌক্তিক',
    'long-term': 'দীর্ঘমেয়াদী',
    'mainly': 'প্রধানত / মূলত',
    'matching': 'মানানসই / মিলযুক্ত',
    'measurement': 'পরিমাপ',
    'mostly': 'অধিকাংশ ক্ষেত্রে / মূলত',
    'motorcycle': 'মোটরসাইকেল',
    'neighbourhood': 'প্রতিবেশ / এলাকা',
    'newspaper': 'সংবাদপত্র / পত্রিকা',
    'next to': 'পাশে / সংলগ্ন',
    'nightmare': 'দুঃস্বপ্ন',
    'nineteen': 'উনিশ',
    'ninety': 'নব্বই',
    'no one': 'কেউ না',
    "o'clock": 'ঘড়ির সময়',
    'occasionally': 'মাঝে মাঝে',
    'ok': 'ঠিক আছে / সম্মত',
    'old-fashioned': 'সেকেলে / প্রাচীনপন্থী',
    'originally': 'মূলত / আদিতে',
    'painful': 'বেদনাদায়ক / কষ্টকর',
    'particularly': 'বিশেষভাবে',
    'partly': 'আংশিকভাবে',
    'perfectly': 'নিখুঁতভাবে',
    'personally': 'ব্যক্তিগতভাবে',
    'photography': 'ফটোগ্রাফি / আলোকচিত্রশিল্প',
    'poisonous': 'বিষাক্ত',
    'policeman': 'পুলিশ কর্মকর্তা',
    'prediction': 'ভবিষ্যদ্বাণী',
    'printer': 'প্রিন্টার যন্ত্র',
    'printing': 'ছাপাখানা / মুদ্রণ',
    'prisoner': 'বন্দী / কয়েদি',
    'probably': 'সম্ভবত',
    'program': 'কর্মসূচি / প্রোগ্রাম',
    'psychologist': 'মনোবিজ্ঞানী',
    'punishment': 'শাস্তি',
    'racing': 'দৌড় প্রতিযোগিতা',
    'railway': 'রেলপথ / রেলওয়ে',
    'rarely': 'কদাচিৎ / খুব কম',
    'really': 'সত্যিই / প্রকৃতপক্ষে',
    'regional': 'আঞ্চলিক',
    'relationship': 'সম্পর্ক / আত্মীয়তা',
    'relatively': 'তুলনামূলকভাবে',
    'reply': 'উত্তর দেওয়া / জবাব',
    'reporter': 'প্রতিবেদক / রিপোর্টার',
    'requirement': 'প্রয়োজনীয়তা / শর্ত',
    'sailing': 'নৌকাচালনা',
    'scary': 'ভীতিকর / ভীতিপ্রদ',
    'secondly': 'দ্বিতীয়ত',
    'service': 'সেবা / সার্ভিস',
    'seventeen': 'সতেরো',
    'seventy': 'সত্তর',
    'shiny': 'চকচকে / উজ্জ্বল',
    'shooting': 'শুটিং / গুলি চালানো',
    'significantly': 'উল্লেখযোগ্যভাবে',
    'similarity': 'সাদৃশ্য / মিল',
    'singer': 'গায়ক / গায়িকা',
    'sixty': 'ষাট',
    'skiing': 'বরফে স্কি করা',
    'slightly': 'সামান্য / কিছুটা',
    'smartphone': 'স্মার্টফোন',
    'software': 'সফটওয়্যার / কম্পিউটার প্রোগ্রাম',
    'speaker': 'বক্তা / স্পিকার',
    'specialist': 'বিশেষজ্ঞ',
    'spicy': 'ঝাল / মসলাযুক্ত',
    'statement': 'বিবৃতি / বক্তব্য',
    'statistic': 'পরিসংখ্যান',
    'successful': 'সফল / সার্থক',
    'successfully': 'সফলভাবে',
    'supporter': 'সমর্থক',
    't-shirt': 'টি-শার্ট',
    'teacher': 'শিক্ষক / শিক্ষিকা',
    'teaching': 'শিক্ষাদান / পড়ানো',
    'teenage': 'কৈশোরকালীন',
    'teenager': 'কিশোর-কিশোরী',
    'thanks': 'ধন্যবাদ',
    'theirs': 'তাদের / ওদের',
    'thief': 'চোর',
    'thirsty': 'তৃষ্ণার্ত',
    'totally': 'সম্পূর্ণরূপে',
    'tourism': 'পর্যটন শিল্প',
    'tourist': 'পর্যটক',
    'traditional': 'ঐতিহ্যবাহী',
    'trainer': 'প্রশিক্ষক',
    'traveller': 'ভ্রমণকারী / যাত্রী',
    'trousers': 'প্যান্ট / পায়জামা',
    'tv': 'টেলিভিশন / টিভি',
    'ultimately': 'চূড়ান্তভাবে / পরিণামে',
    'understanding': 'বোঝাপড়া / উপলব্ধি',
    'used to': 'অভ্যস্ত ছিল / অতীতে করত',
    'useful': 'দরকারী / উপকারী',
    'user': 'ব্যবহারকারী / ইউজার',
    'via': 'মাধ্যমে / দিয়ে',
    'viewer': 'দর্শক',
    'violence': 'সহিংসতা / হিংস্রতা',
    'visitor': 'দর্শনার্থী / মেহমান',
    'waiter': 'ওয়েটার / পরিবেশক',
    'warning': 'সতর্কবার্তা',
    'weakness': 'দুর্বলতা',
    'wealthy': 'ধনী / সম্পদশালী',
    'website': 'ওয়েবসাইট',
    'weekend': 'সাপ্তাহিক ছুটির দিন',
    'whereas': 'যেখানে / পক্ষান্তরে',
    'wherever': 'যেখানেই হোক',
    'wildlife': 'বন্যপ্রাণী',
    'wonderful': 'চমৎকার / অসাধারণ',
    'wooden': 'কাঠের তৈরি',
    'worldwide': 'বিশ্বব্যাপী',
    'would': 'করতাম / হবে (উড)',
    'a': 'একটি / একজন',
    'an': 'একটি / একজন',
    'the': 'টি / টা / নির্দিষ্ট নির্দেশক'
}

def clean_bangla(raw: str) -> str:
    if not raw:
        return ''
    # Remove markers like (N), (V), (Adj.), (Adv.) etc.
    s = re.sub(r'\([A-Za-z\.\s]+\)', '', raw)
    # Split by comma or semicolon
    parts = [p.strip() for p in re.split(r'[,;।]+', s) if p.strip()]
    # Keep up to 3 distinct meanings
    seen = set()
    cleaned = []
    for p in parts:
        # ignore pure english leftovers
        p_clean = re.sub(r'[A-Za-z0-9\-_]+', '', p).strip()
        if p_clean and len(p_clean) > 1 and p_clean not in seen:
            seen.add(p_clean)
            cleaned.append(p_clean)
        if len(cleaned) >= 3:
            break
    if cleaned:
        return ' / '.join(cleaned)
    return raw.strip()

def map_pos(raw_type: str) -> str:
    t = (raw_type or '').lower().strip()
    if 'noun' in t: return 'noun'
    if 'verb' in t: return 'verb'
    if 'adj' in t: return 'adjective'
    if 'adv' in t: return 'adverb'
    if 'prep' in t: return 'preposition'
    if 'conj' in t: return 'conjunction'
    if 'pron' in t: return 'pronoun'
    return 'noun'

def map_cefr(raw_cefr: str) -> str:
    c = (raw_cefr or '').upper().strip()
    if c in ['A1', 'A2', 'B1', 'B2', 'C1']:
        return c
    return 'A2'

def make_bangla_pron(word: str) -> str:
    # Generates a smooth phonetic representation for common word patterns
    w = word.lower()
    return w.capitalize()

# Process all entries
processed_words = []
seen_words = set()

# We want CEFR order: A1 first, then A2, then B1, then B2
cefr_priority = {'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5}

# Convert dict to list
items = list(oxford_raw.values())
items.sort(key=lambda x: (cefr_priority.get(map_cefr(x.get('cefr', '')), 9), x.get('word', '').lower()))

rank = 1
for item in items:
    w = item.get('word', '').strip()
    if not w:
        continue
    w_lower = w.lower()

    pos = map_pos(item.get('type', ''))
    cefr = map_cefr(item.get('cefr', ''))
    ipa = item.get('phon_n_am') or item.get('phon_br') or ''

    # Get Bengali meaning
    bn = SPECIAL_MAP.get(w_lower)
    if not bn:
        raw_bn = dict_36.get(w_lower)
        if raw_bn:
            bn = clean_bangla(raw_bn)
        else:
            # Fallback simple
            bn = SPECIAL_MAP.get(w_lower.replace('-', ' '), '')
    if not bn:
        bn = item.get('definition', '').split('.')[0][:40]

    # Example sentence
    ex = item.get('example', '').strip()
    if not ex:
        ex = f"We use '{w}' in our daily conversation."
    else:
        # clean html or prefixes like "somebody/something"
        ex = re.sub(r'<[^>]+>', '', ex).strip()
        # if multiple, take first
        if ';' in ex:
            ex = ex.split(';')[0].strip()
        if len(ex) > 120:
            ex = ex[:120].strip()

    word_record = {
        'id': f"ox-{rank}",
        'rank': rank,
        'word': w,
        'pos': pos,
        'cefr': cefr,
        'ipa': ipa,
        'bangla': bn,
        'example': ex,
        'definition': item.get('definition', '')[:100]
    }
    processed_words.append(word_record)
    rank += 1

print(f"Total processed Oxford words: {len(processed_words)}")

# Write to public/data/oxford3000.json
json_path = 'public/data/oxford3000.json'
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(processed_words, f, ensure_ascii=False, indent=None)

size_kb = os.path.getsize(json_path) / 1024
print(f"Successfully generated {json_path} ({size_kb:.1f} KB)")

# Also create a compact sample / category metadata TypeScript file for instant fast loading
ts_meta_path = 'src/data/oxford3000Meta.ts'
with open(ts_meta_path, 'w', encoding='utf-8') as f:
    f.write('// Oxford 3000 metadata and core statistics\n')
    f.write('export interface OxfordWordItem {\n')
    f.write('  id: string;\n')
    f.write('  rank: number;\n')
    f.write('  word: string;\n')
    f.write("  pos: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun';\n")
    f.write("  cefr: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';\n")
    f.write('  ipa: string;\n')
    f.write('  bangla: string;\n')
    f.write('  example: string;\n')
    f.write('  definition?: string;\n')
    f.write('}\n\n')
    f.write('export const OXFORD_STATS = {\n')
    f.write(f'  totalWords: {len(processed_words)},\n')
    a1_cnt = sum(1 for w in processed_words if w["cefr"] == "A1")
    a2_cnt = sum(1 for w in processed_words if w["cefr"] == "A2")
    b1_cnt = sum(1 for w in processed_words if w["cefr"] == "B1")
    b2_cnt = sum(1 for w in processed_words if w["cefr"] == "B2")
    f.write(f'  a1Count: {a1_cnt},\n')
    f.write(f'  a2Count: {a2_cnt},\n')
    f.write(f'  b1Count: {b1_cnt},\n')
    f.write(f'  b2Count: {b2_cnt},\n')
    f.write('};\n\n')
    # write first 100 as bundled instant preview
    first_100 = processed_words[:100]
    f.write(f'export const OXFORD_PREVIEW_LIST: OxfordWordItem[] = {json.dumps(first_100, ensure_ascii=False, indent=2)};\n')

print(f"Generated {ts_meta_path}")
