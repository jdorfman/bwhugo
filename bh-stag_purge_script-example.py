#!/usr/bin/python

#arguments
import sys
arguments = sys.argv[1:]

# simple script to purge maxcdn website(s)
from netdnarws import NetDNA
api = NetDNA("alias", "key", "secret")
zones = []
zones.extend([111111]) # Zone ID


for zone_id in zones:
	api.delete("/zones/pull.json/%i/cache" % zone_id)
	print("Zone with ID %i purged." % zone_id)
