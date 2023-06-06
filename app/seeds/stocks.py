from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_stocks():
    apple = Stock(
        name="Apple Inc",
        symbol="AAPL",
        description="Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services. Apple is the world's largest technology company by revenue (totalling $274.5 billion in 2020) and, since January 2021, the world's most valuable company. As of 2021, Apple is the world's fourth-largest PC vendor by unit sales, and fourth-largest smartphone manufacturer. It is one of the Big Five American information technology companies, along with Amazon, Google, Microsoft, and Facebook.",
        market_cap=2788699000000,
        pe_ratio=29.0,
        dividend=0.0054,
        stock_ceo="Tim Cook",
        employees=147000,
        headquarters="Cupertino, California",
        year_founded=1976
    )

    tesla = Stock(
        name="Tesla Inc",
        symbol="TSLA",
        description="Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California. Tesla's current products include electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, as well as other related products and services. In 2020, Tesla had the highest sales in the plug-in and battery electric passenger car segments, capturing 16% of the plug-in market (which includes plug-in hybrids) and 23% of the battery-electric (purely electric) market. Through its subsidiary Tesla Energy, the company develops and is a major installer of solar photovoltaic energy generation systems in the United States. Tesla Energy is also one of the largest global suppliers of battery energy storage systems, with 3 GWh of battery storage supplied in 2020.",
        market_cap=637577500000,
        pe_ratio=53.94,
        dividend=0,
        stock_ceo="Elon Musk",
        employees=70757,
        headquarters="Palo Alto, California",
        year_founded=2003
    )

    ibm = Stock(
        name="International Business Machines",
        symbol="IBM",
        description="International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries. The company began in 1911, founded in Endicott, New York, as the Computing-Tabulating-Recording Company (CTR) and was renamed International Business Machines in 1924. IBM is incorporated in New York. IBM produces and sells computer hardware, middleware and software, and provides hosting and consulting services in areas ranging from mainframe computers to nanotechnology. IBM is also a major research organization, holding the record for most annual U.S. patents generated by a business (as of 2020) for 28 consecutive years. Inventions by IBM include the automated teller machine (ATM), the floppy disk, the hard disk drive, the magnetic stripe card, the relational database, the SQL programming language, the UPC barcode, and dynamic random-access memory (DRAM). The IBM mainframe, exemplified by the System/360, was the dominant computing platform during the 1960s and 1970s.",
        market_cap=116765499000,
        pe_ratio=57.41,
        dividend=0.0513,
        stock_ceo="Arvind Krishna",
        employees=352600,
        headquarters="Armonk, New York",
        year_founded=1911
    )

    microsoft = Stock(
        name="Microsoft Corporation",
        symbol="MSFT",
        description="Microsoft Corporation is an American multinational technology company which produces computer software, consumer electronics, personal computers, and related services. Its best known software products are the Microsoft Windows line of operating systems, the Microsoft Office suite, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. Microsoft ranked No. 21 in the 2020 Fortune 500 rankings of the largest United States corporations by total revenue; it was the world's largest software maker by revenue as of 2016. It is considered one of the Big Five companies in the U.S. information technology industry, along with Google, Apple, Amazon, and Facebook.",
        market_cap=2462708000000,
        pe_ratio=34.29,
        dividend=0.0082,
        stock_ceo="Satya Nadella",
        employees=181000,
        headquarters="Redmond, Washington",
        year_founded=1975
    )

    american_airlines = Stock(
        name="American Airlines Group",
        symbol="AAL",
        description="American Airlines Group Inc. is an American publicly traded airline holding company headquartered in Fort Worth, Texas.",
        market_cap=9649315000,
        pe_ratio=5.32,
        dividend=0.0617,
        stock_ceo="Robert Isom",
        employees=88300,
        headquarters="Fort Worth, Texas",
        year_founded=1930
    )

    gamestop = Stock(
        name="GameStop Corp",
        symbol="GME",
        description="GameStop is an American retail company that specializes in video games, consumer electronics, and gaming merchandise. It operates a chain of retail stores where customers can purchase video game consoles, accessories, and software. GameStop is known for its trade-in program, allowing customers to trade their used games and consoles for store credit or cash. The company has also expanded into digital distribution and operates an online store. GameStop gained significant attention in early 2021 due to a high-profile stock trading frenzy driven by individual investors.",
        market_cap=7328443000,
        pe_ratio=11.23,
        dividend=0.86,
        stock_ceo="Matt Furlong",
        employees=12000,
        headquarters="Grapevine, Texas",
        year_founded=1984
    )

    ford = Stock(
        name="Ford Motor Company",
        symbol="F",
        description="Ford is an American multinational automaker that designs, manufactures, and sells automobiles and commercial vehicles. It was founded by Henry Ford in 1903 and has a long history in the automotive industry. Ford produces a wide range of vehicles, including cars, trucks, SUVs, and electric vehicles. The company is known for iconic models such as the Ford Mustang and F-150. Ford has a global presence and operates in various markets worldwide. It has a strong reputation for innovation and has been involved in the development of advanced technologies and sustainable mobility solutions.",
        market_cap=50369700000,
        pe_ratio=9.28,
        dividend=0.0993,
        stock_ceo="Jim Farley",
        employees=186000,
        headquarters="Dearborn, Michigan",
        year_founded=1903
    )

    nvidia = Stock(
        name="NVIDIA Corporation",
        symbol="NVDA",
        description="Nvidia Corporation is an American multinational technology company incorporated in Delaware and based in Santa Clara, California. It designs graphics processing units (GPUs) for the gaming and professional markets, as well as system on a chip units (SoCs) for the mobile computing and automotive market.",
        market_cap=934499844000,
        pe_ratio=196.03,
        dividend=0.0004,
        stock_ceo="Jensen Huang",
        employees=18717,
        headquarters="Santa Clara, CA",
        year_founded=1993
    )

    dish_network = Stock(
        name="DISH Network Corporation",
        symbol="DISH",
        description="DISH Network Corporation is an American television provider and the owner of the direct-broadcast satellite provider DISH, commonly known as DISH Network, and the over-the-top IPTV service, Sling TV.",
        market_cap=3424669000,
        pe_ratio=1.948,
        dividend=0,
        stock_ceo="Charlie Ergen",
        employees=16000,
        headquarters="Englewood, Colorado",
        year_founded=1980
    )

    amazon = Stock(
        name="Amazon.com Inc",
        symbol="AMZN",
        description="Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is one of the Big Five companies in the U.S. information technology industry, along with Google, Apple, Microsoft, and Facebook. The company has been referred to as one of the most influential economic and cultural forces in the world, as well as the world's most valuable brand.",
        market_cap=1237199094000,
        pe_ratio=280.42,
        dividend=0,
        stock_ceo="Jeff Bezos",
        employees=1335000,
        headquarters="Seattle, Washington",
        year_founded=1994
    )

    amd = Stock(
        name="Advanced Micro Devices Inc",
        symbol="AMD",
        description="Advanced Micro Devices, Inc. (AMD) is an American multinational semiconductor company based in Santa Clara, California, that develops computer processors and related technologies for business and consumer markets. AMD's main products include microprocessors, motherboard chipsets, embedded processors and graphics processors for servers, workstations, personal computers and embedded system applications.",
        market_cap=190360900000,
        pe_ratio=120.01,
        dividend=0,
        stock_ceo="Lisa Su",
        employees=15500,
        headquarters="Santa Clara, California",
        year_founded=1969
    )

    meta = Stock(
        name="Meta Platforms Inc",
        symbol="META",
        description="Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, PCs, virtual reality headsets, wearables and home devices around the world. The company is headquartered in Menlo Park, California.",
        market_cap=678405865000,
        pe_ratio=31.63,
        dividend=0,
        stock_ceo="Mark Zuckerberg",
        employees=105000,
        headquarters="Menlo Park, California",
        year_founded=2004
    )

    jpmorgan = Stock(
        name="JPMORGAN Chase & Co",
        symbol="JPM",
        description="JPMorgan Chase & Co. is an American multinational investment bank and financial services holding company headquartered in New York City. JPMorgan Chase is incorporated in Delaware. As a Bulge Bracket bank, it is a major provider of various investment banking and financial services. It is one of America's Big Four banks, along with Bank of America, Citigroup, and Wells Fargo. JPMorgan Chase is considered to be a universal bank and a custodian bank. The J.P. Morgan brand is used by the investment banking, asset management, private banking, private wealth management, and treasury services divisions.",
        market_cap=401697800000,
        pe_ratio=11.54,
        dividend=0.0291,
        stock_ceo="Jaime Dimon",
        employees=256105,
        headquarters="New York, New York",
        year_founded=1871
    )

    alphabet = Stock(
        name="Alphabet Inc Class A",
        symbol="GOOGL",
        description="Alphabet Inc. is an American multinational conglomerate headquartered in Mountain View, California. It was created through a restructuring of Google on October 2, 2015, and became the parent company of Google and several former Google subsidiaries. The two co-founders of Google remained as controlling shareholders, board members, and employees at Alphabet. Alphabet is the world's fourth-largest technology company by revenue and one of the world's most valuable companies.",
        market_cap=1565744824000,
        pe_ratio=27.55,
        dividend=0,
        stock_ceo="Sundar Pichai",
        employees=135301,
        headquarters="Mountain View, California",
        year_founded=1998
    )

    visa = Stock(
        name="Visa Inc Class A",
        symbol="V",
        description="Visa Inc. is an American multinational financial services corporation headquartered in Foster City, California, United States. It facilitates electronic funds transfers throughout the world, most commonly through Visa-branded credit cards, debit cards and prepaid cards. Visa is one of the world's most valuable companies.",
        market_cap=454172400000,
        pe_ratio=29.42,
        dividend=0.008,
        stock_ceo="Alfred F. Kelly Jr.",
        employees=21000,
        headquarters="San Francisco, California",
        year_founded=1958
    )

    johnson_johnson = Stock(
        name="Johnson & Johnson",
        symbol="JNJ",
        description="Johnson & Johnson (J&J) is an American multinational corporation founded in 1886 that develops medical devices, pharmaceuticals, and consumer packaged goods. Its common stock is a component of the Dow Jones Industrial Average and the company is ranked No. 36 on the 2021 Fortune 500 list of the largest United States corporations by total revenue. Johnson & Johnson is one of the world's most valuable companies, and is one of only two U.S.-based companies that has a prime credit rating of AAA, higher than that of the United States government.",
        market_cap=401166600000,
        pe_ratio=17.79,
        dividend=0.0308,
        stock_ceo="Alex Gorsky",
        employees=135100,
        headquarters="New Brunswick, New Jersey",
        year_founded=1886
    )

    pfizer = Stock(
        name="Pfizer Inc",
        symbol="PFE",
        description="Pfizer Inc. is an American multinational pharmaceutical and biotechnology corporation headquartered on 42nd Street in Manhattan, New York City. The name of the company commemorates its co-founder, Charles Pfizer (1824-1906). Pfizer develops and produces medicines and vaccines for immunology, oncology, cardiology, endocrinology, and neurology. The company has several blockbuster drugs or products that each generate more than 1 billion USD in annual revenues.",
        market_cap=208932913000,
        pe_ratio=7.3,
        dividend=0.0436,
        stock_ceo="Albert Bourla",
        employees=78000,
        headquarters="New York, New York",
        year_founded=1849
    )

    pepsico = Stock(
        name="PepsiCo Inc",
        symbol="PEP",
        description="PepsiCo, Inc. is an American based multinational food, snack, and beverage corporation headquartered in Harrison, New York, in the hamlet of Purchase. PepsiCo's business encompasses all aspects of the food and beverage market. It oversees the manufacturing, distribution, and marketing of its products.",
        market_cap=251221770000,
        pe_ratio=38.31,
        dividend=0.0279,
        stock_ceo="Ramon Laguarta",
        employees=267000,
        headquarters="Purchase, New York",
        year_founded=1965
    )

    disney = Stock(
        name="Walt Disney Company",
        symbol="DIS",
        description="The Walt Disney Company, commonly known as Disney, is an American diversified multinational mass media and entertainment conglomerate headquartered at the Walt Disney Studios complex in Burbank, California.",
        market_cap=160473481000,
        pe_ratio=39.03,
        dividend=0,
        stock_ceo="Bob Chapek",
        employees=203000,
        headquarters="Burbank, California",
        year_founded=1923
    )

    netflix = Stock(
        name="Netflix Inc",
        symbol="NFLX",
        description="Netflix, Inc. is an American over-the-top content platform and production company headquartered in Los Gatos, California. Netflix was founded in 1997 by Reed Hastings and Marc Randolph in Scotts Valley, California. The company's primary business is a subscription-based streaming service offering online streaming from a library of films and television series, including those produced in-house.",
        market_cap=174695727000,
        pe_ratio=40.68,
        dividend=0,
        stock_ceo="Ted Sarandos (Co-CEO)",
        employees=9400,
        headquarters="Los Gatos, California",
        year_founded=1997
    )

    alibaba = Stock(
        name="Alibaba Group Holding Ltd",
        symbol="BABA",
        description="Alibaba Group Holding Limited, also known as Alibaba Group and Alibaba.com, is a Chinese multinational technology company specializing in e-commerce, retail, Internet, and technology. Founded on 28 June 1999 in Hangzhou, Zhejiang, the company provides consumer-to-consumer (C2C), business-to-consumer (B2C), and business-to-business (B2B) sales services via web portals, as well as electronic payment services, shopping search engines and cloud computing services. It owns and operates a diverse portfolio of companies around the world in numerous business sectors.",
        market_cap=634630000000,
        pe_ratio=26.77,
        dividend=0,
        stock_ceo="Daniel Zhang",
        employees=251000,
        headquarters="Hangzhou, Zhejiang, China",
        year_founded=1999
    )

    all_stocks = [apple, tesla, ibm, microsoft, american_airlines, gamestop, ford, nvidia, dish_network, amazon, amd, meta, jpmorgan, alphabet, visa, johnson_johnson, pfizer, pepsico, disney, netflix, alibaba]

    [db.session.add(stock) for stock in all_stocks]
    db.session.commit()
    return all_stocks


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
