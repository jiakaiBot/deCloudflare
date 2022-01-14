# CloudFlare's unamazing growth


Hurricane Electric is a major Internet backbone service provider, and they show a chart listing the [top 100 hosting companies](https://web.archive.org/web/20210826102852/https://bgp.he.net/report/tophosts). We asked them how this data, which updates once a week, is compiled. Rob Mosher replied that "the counts are based on domain names with their nameservers listed."

That's good enough for us, and we began capturing the data from this chart soon after CloudFlare made it into the top 100 in April 2013. Matthew Prince brags about all the traffic he handles ([more than Facebook](https://web.archive.org/web/20210826102852/http://venturebeat.com/2013/06/17/cloudflare-150b-pageviewsmonth-30gb-of-log-dataminute-and-more-traffic-than-facebook/)), but this is bogus. For example, he once claimed that China is the second largest country using CouldFlare after the U.S., while our stats showed otherwise. On further investigation, we found a later quotation in which Prince said that traffic from China was number two — not CloudFlare customers from China, and not CloudFlare websites in China, but traffic!

![](img/mao4.gif)

Yeah, okay, and our modest site here at CloudFlare Watch has been getting a lot of traffic from China also. It's called a "botnet," folks, which means a bunch of automated zombies grab stuff from us, 24 / 7, for reasons unknown. We ran Scroogle.org for seven years, and had the same sort of "traffic." By now we know that if you have zombie problems, you are supposed to be apologetic and work hard to block them. You don't brag about it.

Mr. Prince isn't content to merely compare apples to oranges. His comparison to Facebook is the equivalent of claiming that the water CloudFlare uses to keep its apple tree alive weighs more than the basket of oranges from Facebook's orange tree. It's all reckless hype, and it's amazing that the high-tech press lets him get away with it. They should recognize that Facebook attracts end-users by providing an environment and structure that encourages content, while CloudFlare is a mere traffic conduit that is divorced from both end-users and content.

![](img/evo20.gif)

While we are still interested in how Hurricane Electric collects their domain stats (is it captured midstream, or from zone file access, or what?), ultimately it doesn't matter as long as their methodology is consistent. We are interested in growth over time for domains that use CloudFlare for their authoritative nameservers. CloudFlare's [hosting partners](https://web.archive.org/web/20210826102852/https://www.cloudflare.com/partners/solution-partners/) do not count, nor should they. A click box on the control panel at a CloudFlare hosting partner means little. While it increases the traffic going through CloudFlare, it merely suggests that these partners are happy to offload a chunk of their bandwidth for free, by encouraging their own customers to try out CloudFlare. At this rate, every self-disrespecting hosting provider on the planet should have signed up by now.

![](img/sock2.gif)

No, what matters is how many registered domains use CloudFlare for their nameservers. While the lowest tier at CloudFlare is still free for this, at least it takes some minimal research and commitment before a website is willing to change the nameservers on their domain registration. In short, we feel that the stats from Hurricane Electric, when considered over a span of at least a few months, are worth more than any Matthew Prince quotations in media that [don't know when to quit](cfblock.md). 

[![](img/poem.gif)](repeats.md)

```
Date 	Total domains 	Percent of top 100
2013-05-06 	462,274 	0.200
2013-05-13 	472,085 	0.204
2013-05-20 	480,934 	0.207
2013-05-27 	485,279 	0.209
2013-06-03 	480,989 	0.207
2013-06-10 	487,366 	0.209
2013-06-17 	492,681 	0.212
2013-06-24 	497,098 	0.214
2013-07-01 	503,807 	0.216
2013-07-08 	516,126 	0.221
2013-07-15 	518,662 	0.222
2013-07-22 	519,748 	0.223
2013-07-29 	523,083 	0.224
2013-08-05 	528,595 	0.226
2013-08-12 	536,331 	0.230
2013-08-19 	540,140 	0.231
2013-08-26 	546,689 	0.234
2013-09-02 	553,002 	0.236
2013-09-09 	559,421 	0.239
2013-09-16 	566,034 	0.241
2013-09-23 	570,967 	0.243
2013-09-30 	583,379 	0.248
2013-10-07 	590,639 	0.251
2013-10-14 	598,124 	0.254
2013-10-21 	605,181 	0.257
2013-10-28 	612,161 	0.260
2013-11-04 	618,892 	0.262
2013-11-11 	625,297 	0.265
2013-11-18 	634,680 	0.269
2013-11-25 	645,166 	0.273
2013-12-02 	651,707 	0.276
2013-12-09 	656,592 	0.278
2013-12-16 	658,851 	0.279
2013-12-23 	664,087 	0.281
2013-12-30 	668,845 	0.283
2014-01-06 	674,649 	0.285
2014-01-13 	680,664 	0.288
2014-01-20 	686,548 	0.290
2014-01-27 	695,184 	0.293
2014-02-03 	701,853 	0.296
2014-02-10 	707,212 	0.298
2014-02-17 	715,565 	0.301
2014-02-24 	721,120 	0.303
2014-03-03 	727,763 	0.305
2014-03-10 	738,270 	0.309
2014-03-17 	748,705 	0.313
2014-03-24 	759,522 	0.318
2014-03-31 	767,933 	0.321
2014-04-07 	776,532 	0.324
2014-04-14 	789,967 	0.329
2014-04-21 	798,921 	0.332
2014-04-28 	810,208 	0.337
2014-05-05 	820,826 	0.341
2014-05-12 	829,597 	0.344
2014-05-19 	843,120 	0.350
2014-05-26 	854,125 	0.354
2014-06-02 	862,998 	0.358
2014-06-09 	870,092 	0.360
2014-06-16 	880,063 	0.364
2014-06-23 	888,970 	0.368
2014-06-30 	900,388 	0.372
2014-07-07 	907,303 	0.375
2014-07-14 	919,299 	0.379
2014-07-21 	929,176 	0.383
2014-07-28 	938,897 	0.387
2014-08-04 	949,517 	0.391
2014-08-11 	959,261 	0.395
2014-08-18 	971,269 	0.399
2014-08-25 	983,229 	0.404
2014-09-01 	996,492 	0.409
2014-09-08 	1,008,809 	0.414
2014-09-15 	1,018,725 	0.418
2014-09-22 	1,028,254 	0.421
2014-09-29 	1,039,559 	0.425
2014-10-06 	1,055,063 	0.431
2014-10-13 	1,069,605 	0.436
2014-10-20 	1,092,576 	0.445
2014-10-27 	1,105,575 	0.451
2014-11-03 	1,119,242 	0.456
2014-11-10 	1,137,673 	0.464
2014-11-17 	1,151,151 	0.469
2014-11-24 	1,166,656 	0.475
2014-12-01 	1,177,647 	0.479
2014-12-08 	1,189,078 	0.484
2014-12-15 	1,207,842 	0.491
2014-12-22 	1,217,563 	0.495
2014-12-29 	1,231,764 	0.501
2015-01-05 	1,247,680 	0.507
2015-01-12 	1,265,245 	0.514
2015-01-19 	1,280,109 	0.520
2015-01-26 	1,297,321 	0.526
2015-02-02 	1,312,308 	0.531
2015-02-09 	1,332,308 	0.539
2015-02-16 	1,347,477 	0.544
2015-02-23 	1,359,383 	0.549
2015-03-02 	1,381,804 	0.558
2015-03-09 	1,399,204 	0.564
2015-03-16 	1,418,583 	0.572
2015-03-23 	1,435,965 	0.579
2015-03-30 	1,454,610 	0.586
2015-04-06 	1,469,641 	0.592
2015-04-13 	1,484,206 	0.597
2015-04-20 	1,499,685 	0.603
2015-04-27 	1,517,483 	0.610
2015-05-04 	1,538,892 	0.620
2015-05-11 	1,552,349 	0.625
2015-05-18 	1,569,546 	0.632
2015-05-25 	1,589,371 	0.640
2015-06-01 	1,607,757 	0.647
2015-06-08 	1,630,764 	0.655
2015-06-15 	1,646,304 	0.661
2015-06-22 	1,671,352 	0.670
2015-06-29 	1,688,467 	0.676
2015-07-06 	1,709,286 	0.683
2015-07-13 	1,729,079 	0.691
2015-07-20 	1,755,542 	0.701
2015-07-27 	1,776,521 	0.710
2015-08-03 	1,800,276 	0.719
2015-08-10 	1,819,396 	0.726
2015-08-17 	1,849,434 	0.737
2015-08-24 	1,871,697 	0.745
2015-08-31 	1,897,175 	0.755
2015-09-07 	1,923,030 	0.764
2015-09-14 	1,965,601 	0.779

...the data source did not update for one month...

2015-10-15 	2,459,695 	0.915
2015-10-19 	2,477,094 	0.919
2015-10-26 	2,503,454 	0.921
2015-11-02 	2,525,536 	0.925
2015-11-09 	2,549,874 	0.918
2015-11-16 	2,586,187 	0.914
2015-11-23 	2,620,791 	0.912
2015-11-30 	2,654,232 	0.920
2015-12-07 	2,690,496 	0.931
2015-12-14 	2,716,079 	0.938
2015-12-21 	2,745,964 	0.946
2015-12-28 	2,767,578 	0.953
2016-01-04 	2,780,037 	0.956
2016-01-11 	2,808,816 	0.964
2016-01-18 	2,833,824 	0.971
2016-01-25 	2,854,693 	0.975
2016-02-01 	2,889,095 	0.984
2016-02-08 	2,921,854 	0.992
2016-02-15 	2,941,870 	0.996
2016-02-22 	2,980,241 	1.000
2016-02-29 	3,015,906 	1.005
2016-03-07 	3,052,477 	1.010
2016-03-14 	3,093,608 	1.022
2016-03-21 	3,123,234 	1.029
2016-03-28 	3,154,356 	1.039
2016-04-04 	3,175,503 	1.043
2016-04-11 	3,201,418 	1.050
2016-04-18 	3,230,048 	1.058
2016-04-25 	3,250,479 	1.065
2016-05-02 	3,284,012 	1.076
2016-05-09 	3,304,421 	1.082
2016-05-16 	3,345,090 	1.095
2016-05-23 	3,369,703 	1.101
2016-05-30 	3,398,037 	1.110
2016-06-06 	3,422,237 	1.118
2016-06-13 	3,446,664 	1.126
2016-06-20 	3,466,012 	1.133
2016-06-27 	3,491,453 	1.143
2016-07-04 	3,535,104 	1.154
2016-07-11 	3,557,826 	1.162
2016-07-18 	3,577,119 	1.168
2016-07-25 	3,594,073 	1.173
2016-08-01 	3,598,272 	1.190
2016-08-08 	3,643,865 	1.204
2016-08-15 	3,671,903 	1.213
2016-08-22 	3,693,125 	1.219
2016-08-29 	3,710,646 	1.225
2016-09-05 	3,741,690 	1.235
2016-09-12 	3,760,204 	1.242
2016-09-19 	3,785,458 	1.252
2016-09-26 	3,794,284 	1.255
2016-10-03 	3,826,115 	1.267
2016-10-10 	3,859,078 	1.277
2016-10-17 	3,900,896 	1.289
2016-10-24 	3,928,593 	1.298
2016-10-31 	3,966,977 	1.310
2016-11-07 	4,007,417 	1.325
2016-11-14 	4,044,849 	1.336
2016-11-21 	4,090,463 	1.353
2016-11-28 	4,128,982 	1.368
2016-12-05 	4,150,122 	1.374
2016-12-12 	4,180,124 	1.388
2016-12-19 	4,215,130 	1.403
2016-12-26 	4,264,692 	1.426
2017-01-02 	4,313,167 	1.449
2017-01-09 	4,370,013 	1.468
2017-01-16 	4,412,616 	1.481
2017-01-23 	4,435,988 	1.487
2017-01-30 	4,497,257 	1.507
2017-02-06 	4,565,328 	1.528
2017-02-13 	4,630,694 	1.546
2017-02-20 	4,692,037 	1.563
2017-02-27 	4,738,938 	1.580
2017-03-06 	4,763,870 	1.582
2017-03-13 	4,797,089 	1.592
2017-03-20 	4,848,941 	1.607
2017-03-27 	4,872,968 	1.614
2017-04-03 	4,899,299 	1.627
2017-04-10 	4,929,269 	1.638
2017-04-17 	4,935,522 	1.640
2017-04-24 	4,967,471 	1.648
2017-05-01 	4,999,621 	1.656
2017-05-08 	5,045,945 	1.670
2017-05-15 	5,085,359 	1.680
2017-05-22 	5,118,847 	1.691
2017-05-29 	5,156,948 	1.699
2017-06-05 	5,183,607 	1.703
2017-06-12 	5,231,308 	1.722
2017-06-19 	5,507,691 	1.793
2017-06-26 	5,571,118 	1.813
2017-07-03 	5,592,312 	1.820
2017-07-10 	5,617,151 	1.827
2017-07-17 	5,653,175 	1.837
2017-07-24 	5,700,932 	1.851
2017-07-31 	5,771,722 	1.873
2017-08-07 	5,809,459 	1.883
2017-08-14 	5,836,431 	1.890
2017-08-21 	5,872,947 	1.900
2017-08-28 	5,904,417 	1.911
2017-09-04 	5,944,257 	1.920
2017-09-11 	5,977,055 	1.927
2017-09-18 	6,013,372 	1.936
2017-09-25 	6,047,315 	1.945
2017-10-02 	6,094,842 	1.959
2017-10-09 	6,129,147 	1.966
2017-10-16 	6,157,099 	1.973
2017-10-23 	6,198,152 	1.986
2017-10-30 	6,235,789 	1.998
2017-11-06 	6,271,018 	2.009
2017-11-13 	6,299,504 	2.024
2017-11-20 	6,340,142 	2.037
2017-11-27 	6,363,377 	2.042
2017-12-04 	6,390,003 	2.047
2017-12-11 	6,426,854 	2.058
2017-12-18 	6,458,112 	2.071
2017-12-25 	6,445,461 	2.067
2018-01-01 	6,443,406 	2.067
2018-01-08 	6,482,529 	2.077
2018-01-15 	6,514,604 	2.087
2018-01-22 	6,528,120 	2.091
2018-01-29 	6,564,496 	2.102
2018-02-05 	6,599,073 	2.110
2018-02-12 	6,634,101 	2.116
2018-02-19 	6,664,120 	2.126
2018-02-26 	6,654,423 	2.121
2018-03-05 	6,696,513 	2.133
2018-03-12 	6,739,825 	2.141
2018-03-19 	6,779,526 	2.139
2018-03-26 	6,814,395 	2.138
2018-04-02 	6,859,918 	2.149
2018-04-09 	6,909,496 	2.162
2018-04-16 	6,954,315 	2.172
2018-04-23 	7,006,517 	2.186
2018-04-30 	7,043,652 	2.198
2018-05-07 	7,099,084 	2.216
2018-05-14 	7,148,454 	2.226
2018-05-21 	7,207,113 	2.242
2018-05-28 	7,362,802 	2.287
2018-06-04 	7,474,019 	2.319
2018-06-11 	7,563,181 	2.345
2018-06-18 	7,608,843 	2.356
2018-06-25 	7,655,184 	2.365
2018-07-02 	7,718,513 	2.374
2018-07-09 	7,762,731 	2.384
2018-07-16 	7,834,993 	2.403
2018-07-23 	7,901,368 	2.424
2018-07-30 	7,936,604 	2.435
2018-08-06 	7,992,083 	2.447
2018-08-13 	8,051,515 	2.460
2018-08-20 	8,116,197 	2.477
2018-08-27 	8,181,685 	2.495
2018-09-03 	8,233,488 	2.507
2018-09-10 	8,281,597 	2.518
2018-09-17 	8,341,527 	2.531
2018-09-24 	8,379,509 	2.538
2018-10-01 	8,413,490 	2.547
2018-10-08 	8,461,715 	2.559
2018-10-15 	8,494,717 	2.565
2018-10-22 	8,526,445 	2.569
2018-10-29 	8,561,946 	2.580
2018-11-05 	8,599,714 	2.590
2018-11-12 	8,623,601 	2.594
2018-11-19 	8,692,707 	2.610
2018-11-26 	8,725,435 	2.618
2018-12-03 	8,761,409 	2.624
2018-12-10 	8,802,587 	2.634
2018-12-17 	8,837,849 	2.642
2018-12-24 	8,884,186 	2.655
2018-12-31 	8,967,431 	2.679
2019-01-07 	9,029,733 	2.696
2019-01-14 	9,116,113 	2.717
2019-01-21 	9,163,968 	2.729
2019-01-28 	9,212,710 	2.741
2019-02-04 	9,259,657 	2.751
2019-02-11 	9,289,395 	2.757
2019-02-18 	9,327,549 	2.764
2019-02-25 	9,367,875 	2.773
2019-03-04 	9,422,615 	2.785
2019-03-11 	9,456,622 	2.792
2019-03-18 	9,536,879 	2.816
2019-03-25 	9,582,190 	2.827
2019-04-01 	9,614,826 	2.834
2019-04-08 	9,661,770 	2.843
2019-04-15 	9,639,449 	2.833
2019-04-22 	9,663,323 	2.838
2019-04-29 	9,701,268 	2.846
2019-05-06 	9,726,091 	2.852
2019-05-13 	9,755,458 	2.859
2019-05-20 	9,771,923 	2.860
2019-05-27 	9,804,848 	2.868
2019-06-03 	9,825,872 	2.872
2019-06-10 	9,848,810 	2.877
2019-06-17 	9,874,825 	2.882
2019-06-24 	9,920,997 	2.892
2019-07-01 	9,945,591 	2.895
2019-07-08 	9,966,342 	2.899
2019-07-15 	10,009,608 	2.905
2019-07-22 	10,042,009 	2.916
2019-07-29 	10,061,628 	2.919
2019-08-05 	10,083,894 	2.923
2019-08-12 	10,118,603 	2.930
2019-08-19 	10,151,279 	2.936
2019-08-26 	10,187,533 	2.944
2019-09-02 	10,229,840 	2.955
2019-09-09 	10,258,506 	2.961
2019-09-16 	10,299,487 	2.970
2019-09-23 	10,331,298 	2.976
2019-09-30 	10,365,561 	2.984
2019-10-07 	10,405,629 	2.993
2019-10-14 	10,448,773 	3.001
2019-10-21 	10,493,553 	3.012
2019-10-28 	10,530,175 	3.020
2019-11-04 	10,573,154 	3.031
2019-11-11 	10,626,620 	3.043
2019-11-18 	10,652,831 	3.050
2019-11-25 	10,712,813 	3.064
2019-12-02 	10,771,957 	3.078
2019-12-09 	10,869,576 	3.104
2019-12-16 	10,932,699 	3.120
2019-12-23 	10,992,952 	3.032
2019-12-30 	11,024,536 	3.041
2020-01-06 	11,046,219 	3.045
2020-01-13 	11,072,583 	3.049
2020-01-20 	11,104,343 	3.055
2020-01-27 	11,121,659 	3.057
2020-02-03 	11,131,602 	3.056
2020-02-10 	11,157,317 	3.059
2020-02-17 	11,195,632 	3.064
2020-02-24 	11,232,851 	3.071
2020-03-02 	11,543,562 	2.799
2020-03-09 	11,598,986 	2.804
2020-03-16 	11,608,288 	2.802
2020-03-23 	11,614,818 	2.802
2020-03-30 	11,594,092 	2.796
2020-04-06 	11,608,284 	2.798
2020-04-13 	11,661,017 	2.808
2020-04-20 	11,777,589 	2.830
2020-04-27 	11,802,977 	2.834
2020-05-04 	11,855,622 	2.845
2020-05-11 	11,905,370 	2.854
2020-05-18 	11,925,996 	2.857
2020-05-25 	11,975,702 	2.867
2020-06-01 	12,006,857 	2.871
2020-06-08 	12,040,513 	2.879
2020-06-15 	12,088,287 	2.887
2020-06-22 	12,134,019 	2.896
2020-06-29 	12,058,454 	2.948
2020-07-06 	12,121,766 	2.961
2020-07-13 	12,181,945 	2.973
2020-07-20 	12,221,082 	2.981
2020-07-27 	12,253,014 	2.987



### Harvard Business School
### The source of CloudFlare's delusions

![](img/harvard.gif)

- [Why entrepreneurs need to be a little delusional](https://web.archive.org/web/20210826102852/http://web.archive.org/web/20140715071656/http://poetsandquants.com/2013/11/18/qa-with-harvards-top-entrepreneurship-professor/)   (2013-11-18)

```
We can tell students what the failure odds are, but it's one thing for
people to know the stats, and it's another to actually feel it's going to
be you. A lot of people think they will be that one person to beat the
odds, and I guess that's good to have that confidence. Basically we
need people to be a little delusional.
```
 — Professor Tom Eisenmann, Harvard Business School


- [HBS-founded CloudFlare is Sky High](https://web.archive.org/web/20210826102852/http://web.archive.org/web/20140911104439/http://www.harbus.org/2011/cloudflare/)   (2011-11-14)

```
However you describe CloudFlare, it is clearly flourishing. Since its
founding two years ago at HBS, the company's network now extends
to 15 billion page views and 350 million visitors per month, which is
more traffic than Amazon, Wikipedia and Twitter combined. 'One out
of every five people on the Internet has passed through our network
in the last month,' says Prince. 'Kind of stunning.' ... Zatlyn and Prince
cite a number of HBS influences as critical sources of support, with
Professor Eisenmann being at the top of the list. They recount how
they took his Entrepreneurship course their first year, and he then
encouraged them from their very first discussions beginning in the
lobby bar at the Sheraton in Palo Alto. 'Tom was a cheerleader from
the beginning,' says Prince. 'And he's continued to be in touch. Every
time he is out here, we see him.'
```

![](img/shelter4.gif)


---

[home page](README.md)